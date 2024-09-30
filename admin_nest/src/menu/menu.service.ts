import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { Repository } from 'typeorm';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {}
  async createMenu(createMenuDto: CreateMenuDto) {
    try {
      await this.menuRepository.save(createMenuDto);
      return '插入成功';
    } catch (error) {
      throw new ApiException('插入失败', 20000);
    }
  }
  getMenuList() {
    return;
  }
}
