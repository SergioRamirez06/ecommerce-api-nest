import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessageWsService } from './message-ws.service';
import { Socket, Server } from 'socket.io';
import { NewMessageDto } from './dtos/new-message.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/interfaces';

@WebSocketGateway({ cors: true })
export class MessageWsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss: Server;

  
  constructor(
    private readonly messageWsService: MessageWsService,
    private readonly jwtService: JwtService
  ) {}

  async handleConnection( client: Socket ) {
    const token = client.handshake.headers.authenticacion as string;
    let payload: JwtPayload;

    try {
      payload = this.jwtService.verify( token )
      await this.messageWsService.registerClient(client, payload.id )

    } catch (error) {
      client.disconnect();
      return;

    }
    
    this.wss.emit('clients-update', this.messageWsService.getCountClient() )
  }
  handleDisconnect(client: Socket) {
    this.messageWsService.removeClient(client.id)
    this.wss.emit('clients-update', this.messageWsService.getCountClient() )

  }

  @SubscribeMessage('message-from-client')
  onMessageFromClient( client: Socket, payload: NewMessageDto ) {
    // console.log({id: socket.id, message: payload })

    //! Emite unicamente al cliente.
    // client.emit('message-from-server', {
    //   fullName: 'Soy yo',
    //   message: payload.message || 'No messages'
    // })


    //! Emitir a todos menos la cliente.
    // client.broadcast.emit('message-from-server', {
    //   fullName: 'Soy yo',
    //   message: payload.message || 'No messages'
    // })


    //! Emitir a todos incluyendo al cliente
    this.wss.emit('message-from-server', {
      fullName: this.messageWsService.getUserFullName(client.id),
      message: payload.message || 'No messages'
    })
  }
}
