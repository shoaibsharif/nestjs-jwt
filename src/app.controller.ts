import {
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Body,
} from "@nestjs/common";
import { AuthService } from "./auth/auth.service";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { LocalAuthGuard } from "./auth/guards/local-auth.guard";

@Controller("auth")
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Body() user: { email: string; password: string }) {
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Request() req) {
    return req.user;
  }

  @Post("register")
  async register(@Body() newUser) {
    return this.authService.register(newUser);
  }
}
