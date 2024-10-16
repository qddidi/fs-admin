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
    //获取自定义装饰器配置的元数据`permissions`
    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );

    // 如果没有配置则不需要验证权限的路由，直接放行
    if (!requiredPermissions) {
      return true;
    }
    // 从request拿到当前用户登录信息(全局守卫UserGuard已经将用户信息挂载到request上)
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    // 从缓存中获取用户的权限列表
    const userPermissions = await this.cacheService.get(
      `${user.sub}_permissions`,
    );
    // 用户未登录或未设置权限，拒绝访问
    if (!user || !userPermissions) {
      return false;
    }
    //判断用户是否拥有所需的权限
    const hasPermission = requiredPermissions.every((permission) =>
      userPermissions.includes(permission),
    );
    return hasPermission;
  }
}
