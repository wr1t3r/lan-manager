import axios from "axios/index";
import qs from "qs";

export default {
    call(url, params) {
        return axios({
            method: 'get',
            url: url,
            data: qs.stringify(params),
            config: { headers: {
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
                'Access-Control-Allow-Headers': 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept',
            }}
        });
    }
};
