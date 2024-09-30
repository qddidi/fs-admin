import { Injectable } from '@nestjs/common';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    return await this.roleRepository.save(createRoleDto);
  }
  async findAll(): Promise<Role[]> {
    return await this.roleRepository.find();
  }
}
