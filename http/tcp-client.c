#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <sys/types.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <sys/select.h>

#define PORT 4455

void main() {
        int clientSocket1;
        struct sockaddr_in serverAddr;
        char buffer[1024];

        int clientSocket2;

        clientSocket1 = socket(PF_INET, SOCK_STREAM, 0);
        clientSocket2 = socket(PF_INET, SOCK_STREAM, 0);

        serverAddr.sin_family = AF_INET;
        serverAddr.sin_port = htons(PORT);
        serverAddr.sin_addr.s_addr = inet_addr("127.0.0.1");

        connect(clientSocket1, (struct sockaddr*)&serverAddr, sizeof(serverAddr));
        connect(clientSocket2, (struct sockaddr*)&serverAddr, sizeof(serverAddr));

        fd_set socks;

        FD_ZERO(&socks);
        FD_SET(clientSocket1, &socks);
        FD_SET(clientSocket2, &socks);

        int len;
        while(1) {
                fd_set copy = socks;
                len = select(clientSocket2 + 1, &copy, NULL, NULL, NULL);
                printf("select end\n");
                if (FD_ISSET(clientSocket1, &copy)) {
                        recv(clientSocket1, &buffer, 1024, 0);
                        printf("1: %s", buffer);
                }

                if (FD_ISSET(clientSocket2, &copy)) {
                        recv(clientSocket2, &buffer, 1024, 0);
                        printf("2: %s", buffer);
                }
        }
}