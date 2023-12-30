From nginx:latest

#docker copy는 wildcard가 들어가면... recursive하게 파일을 옮기지 않는다...
#https://stackoverflow.com/questions/30215830/dockerfile-copy-keep-subdirectory-structure
#이거때매 3~4시간 버린듯...
COPY ./build/ /usr/share/nginx/html/

#깔아서 돌려봤는데 systemctl로 돌아가지 않음.
#Loaded: loaded (/lib/systemd/system/nginx.service
#들어가서 입력해보니까 permission denied뜸
#https://velog.io/@tlatjdgh3778/React-Nginx-%EB%A5%BC-%EB%8F%84%EC%BB%A4-%EC%9D%B4%EB%AF%B8%EC%A7%80%EB%A1%9C-%EB%A7%8C%EB%93%A4%EC%96%B4%EC%84%9C-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0
CMD ["nginx", "-g", "daemon off;"]
