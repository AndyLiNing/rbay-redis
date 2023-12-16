const createSecret = () => {
    return 'kubectl create secret generic redissecret --from-literal REDISPW=myRedisPassword'
}
