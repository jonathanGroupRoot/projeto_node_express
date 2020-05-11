const env = process.env.NODE_ENV || 'dev';
const config = () => 
{
    switch (env)
    {
        case 'dev': 
        return
        {
            bdString: 'mongodb+srv://jonathan_adm:78951root@clusterapi-irvcy.mongodb.net/test?retryWrites=true&w=majority'
        }
        case 'hml':
        return 
        {
            bd_string: 'mongodb+srv://jonathan_adm:78951root@clusterapi-irvcy.mongodb.net/test?retryWrites=true&w=majority'
        }
        case 'prod':
        return 
        {
            bd_string: 'mongodb+srv://jonathan_adm:78951root@clusterapi-irvcy.mongodb.net/test?retryWrites=true&w=majority'
        }
    }
};
console.log(`iniciando a API em ambiente ${env.toUpperCase()}`);
module.exports = config();