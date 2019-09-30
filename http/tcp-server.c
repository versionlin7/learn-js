#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <sys/types.h>
#include <netinet/in.h>
#include <arpa/inet.h>

#define PORT 4455

void main() {
        int sockfd;//server sock fd
        struct sockaddr_in serverAddr;//server listening address object

        int newSocket;//client sockfd
        struct sockaddr_in newAddr;//client address object

        socklen_t addr_size;
        char buffer[1024];
        sockfd = socket(PF_INET, SOCK_STREAM, 0);//create socket file descriptor
        memset(&serverAddr, '\0', sizeof(serverAddr));//clear object

        serverAddr.sin_family = AF_INET;//setting server address
        serverAddr.sin_port = htons(PORT);
        serverAddr.sin_addr.s_addr = inet_addr("127.0.0.1");

        bind(sockfd, (struct sockaddr*)&serverAddr, sizeof(serverAddr));//bind sock to the given addr

        listen(sockfd, 5);//let the sock start to listen thus enter to server mode
        addr_size = sizeof(newAddr);//byte length of address object,why??

        //accept server sock and save client addr info to newAddr
        newSocket = accept(sockfd, (struct sockaddr*)&newAddr, &addr_size);

        printf("%s\n", newSocket);

        strcpy(buffer, "hello");

        send(newSocket, buffer, strlen(buffer), 0);
      
        recv(newSocket, &buffer, 1024, 0);

        printf("%s", buffer);

}