import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { CacheService } from 'src/cache/cache.service';
@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,

    private cacheService: CacheService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );
    console.log({ requiredPermissions });

    if (!requiredPermissions) {
      return true; // 不需要验证权限的路由，直接放行
    }

    const request = context.switchToHttp().getRequest();
    const { user } = request; // 假设已经通过身份验证并将用户信息存储在请求对象的 user 属性中
    console.log(user);
    const userPermissions = await this.cacheService.get(
      `${user.sub}_permissions`,
    );
    console.log(userPermissions);
    if (!user || !userPermissions) {
      return false; // 用户未登录或未设置权限，拒绝访问
    }

    const hasPermission = requiredPermissions.every((permission) =>
      userPermissions.includes(permission),
    );
    return hasPermission;
  }
}
