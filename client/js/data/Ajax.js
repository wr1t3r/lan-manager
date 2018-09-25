import axios from "axios/index";
import qs from "qs";

export default {
    call(url, params) {
        return axios({
            method: 'post',
            url: url,
            data: qs.stringify(params),
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        });
    }
};
