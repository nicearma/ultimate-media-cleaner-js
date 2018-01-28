import {ResponseCode} from '../consts/response-code.const';
import {Response} from '../models/response.model';

export abstract class UmcService {


    handlerResponse(res: Response) {
        switch (res.code) {
            case ResponseCode.badRequest:
            // TODO: add the real logic
            return res.response;
            case ResponseCode.successful:
            default:
            return res.response;
        }

    }



}
