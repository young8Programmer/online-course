import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({ ...createUserDto, password: hashedPassword });
    await this.userRepository.save(user);
  }

  async updateUser(id: number, updateUserDto: CreateUserDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new Error('User topilmadi');
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOneBy({ id });
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new Error('User topilmadi');
    await this.userRepository.remove(user);
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      const access_token = this.jwtService.sign({ email: user.email, sub: user.id, role: user.role });
      const refresh_token = this.jwtService.sign({ email: user.email, sub: user.id, role: user.role }, { expiresIn: '7d' });
      return { access_token, refresh_token };
    }
    throw new Error('Nimadir xato');
  }
}
