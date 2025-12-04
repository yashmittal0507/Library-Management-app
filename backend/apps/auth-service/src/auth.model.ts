import { ApiProperty } from '@nestjs/swagger';

export class RegisterDetails {
    @ApiProperty({ example: 'John Doe', description: 'User name', type: String })
    name: string;

    @ApiProperty({ example: 'john@example.com', description: 'User email', type: String })
    email: string;

    @ApiProperty({ example: 'password123', description: 'User password', type: String })
    password: string;
}

export class LoginDetails {
    @ApiProperty({ example: 'john@example.com', description: 'User email', type: String })
    email: string;

    @ApiProperty({ example: 'password123', description: 'User password', type: String })
    password: string;
}