OS=$1
ARCH=$2

case $OS in
    linux)
        case $ARCH in
            386)
                yarn ebuildli32 ;;
            amd64)
                yarn ebuildlx64 ;;
            arm)
                yarn ebuildla32 ;;
            arm64)
                yarn ebuildla64
        esac 
        ;;
    windows)
        case $ARCH in
            386)
                yarn ebuildwi32 ;;
            amd64)
                yarn ebuildwx64 ;;
            arm)
                yarn ebuildwa32 ;;
            arm64)
                yarn ebuildwa64
        esac
        ;;
    darwin)
        case $ARCH in
            amd64)
                yarn ebuildmx64 ;;
            arm64)
                yarn ebuildma64
        esac
esac
