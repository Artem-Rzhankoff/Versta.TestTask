/// <reference path="./custom.d.ts" />
// tslint:disable
/**
 * Versta.TestTask.OrderService
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v1
 * 
 *
 * NOTE: This file is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the file manually.
 */

import * as url from "url";
import * as isomorphicFetch from "isomorphic-fetch";
import { Configuration } from "./configuration";

const BASE_PATH = "/".replace(/\/+$/, "");

/**
 *
 * @export
 */
export const COLLECTION_FORMATS = {
    csv: ",",
    ssv: " ",
    tsv: "\t",
    pipes: "|",
};

/**
 *
 * @export
 * @interface FetchAPI
 */
export interface FetchAPI {
    (url: string, init?: any): Promise<Response>;
}

/**
 *
 * @export
 * @interface FetchArgs
 */
export interface FetchArgs {
    url: string;
    options: any;
}

/**
 *
 * @export
 * @class BaseAPI
 */
export class BaseAPI {
    protected configuration?: Configuration;

    constructor(configuration?: Configuration, protected basePath: string = BASE_PATH, protected fetch: FetchAPI = isomorphicFetch) {
        if (configuration) {
            this.configuration = configuration;
            this.basePath = configuration.basePath || this.basePath;
        }
    }
}

/**
 *
 * @export
 * @class RequiredError
 * @extends {Error}
 */
export class RequiredError extends Error {
    name = "RequiredError"
    constructor(public field: string, msg?: string) {
        super(msg);
    }
}

/**
 * 
 * @export
 * @interface DadataParams
 */
export interface DadataParams {
    /**
     * 
     * @type {string}
     * @memberof DadataParams
     */
    apiToken?: string;
}
/**
 * 
 * @export
 * @interface OrderViewModel
 */
export interface OrderViewModel {
    /**
     * 
     * @type {number}
     * @memberof OrderViewModel
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof OrderViewModel
     */
    senderCity?: string;
    /**
     * 
     * @type {string}
     * @memberof OrderViewModel
     */
    senderAddress?: string;
    /**
     * 
     * @type {string}
     * @memberof OrderViewModel
     */
    receiverCity?: string;
    /**
     * 
     * @type {string}
     * @memberof OrderViewModel
     */
    receiverAddress?: string;
    /**
     * 
     * @type {number}
     * @memberof OrderViewModel
     */
    weightCargo?: number;
    /**
     * 
     * @type {Date}
     * @memberof OrderViewModel
     */
    dateOfCargoPickup?: Date;
}
/**
 * AddressApi - fetch parameter creator
 * @export
 */
export const AddressApiFetchParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiAddressGetDaDataParamsGet(options: any = {}): FetchArgs {
            const localVarPath = `/api/Address/getDaDataParams`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            localVarUrlObj.search = null;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * AddressApi - functional programming interface
 * @export
 */
export const AddressApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiAddressGetDaDataParamsGet(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<DadataParams> {
            const localVarFetchArgs = AddressApiFetchParamCreator(configuration).apiAddressGetDaDataParamsGet(options);
            return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    } else {
                        throw response;
                    }
                });
            };
        },
    }
};

/**
 * AddressApi - factory interface
 * @export
 */
export const AddressApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiAddressGetDaDataParamsGet(options?: any) {
            return AddressApiFp(configuration).apiAddressGetDaDataParamsGet(options)(fetch, basePath);
        },
    };
};

/**
 * AddressApi - object-oriented interface
 * @export
 * @class AddressApi
 * @extends {BaseAPI}
 */
export class AddressApi extends BaseAPI {
    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AddressApi
     */
    public apiAddressGetDaDataParamsGet(options?: any) {
        return AddressApiFp(this.configuration).apiAddressGetDaDataParamsGet(options)(this.fetch, this.basePath);
    }

}
/**
 * OrderApi - fetch parameter creator
 * @export
 */
export const OrderApiFetchParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {number} courseId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiOrderCourseIdGet(courseId: number, options: any = {}): FetchArgs {
            // verify required parameter 'courseId' is not null or undefined
            if (courseId === null || courseId === undefined) {
                throw new RequiredError('courseId','Required parameter courseId was null or undefined when calling apiOrderCourseIdGet.');
            }
            const localVarPath = `/api/Order/{courseId}`
                .replace(`{${"courseId"}}`, encodeURIComponent(String(courseId)));
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            localVarUrlObj.search = null;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {OrderViewModel} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiOrderCreatePost(body?: OrderViewModel, options: any = {}): FetchArgs {
            const localVarPath = `/api/Order/create`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'application/json';

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            localVarUrlObj.search = null;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            const needsSerialization = (<any>"OrderViewModel" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.body =  needsSerialization ? JSON.stringify(body || {}) : (body || "");

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiOrderGet(options: any = {}): FetchArgs {
            const localVarPath = `/api/Order`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            localVarUrlObj.search = null;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * OrderApi - functional programming interface
 * @export
 */
export const OrderApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @param {number} courseId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiOrderCourseIdGet(courseId: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<OrderViewModel> {
            const localVarFetchArgs = OrderApiFetchParamCreator(configuration).apiOrderCourseIdGet(courseId, options);
            return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    } else {
                        throw response;
                    }
                });
            };
        },
        /**
         * 
         * @param {OrderViewModel} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiOrderCreatePost(body?: OrderViewModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
            const localVarFetchArgs = OrderApiFetchParamCreator(configuration).apiOrderCreatePost(body, options);
            return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response;
                    } else {
                        throw response;
                    }
                });
            };
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiOrderGet(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Array<OrderViewModel>> {
            const localVarFetchArgs = OrderApiFetchParamCreator(configuration).apiOrderGet(options);
            return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    } else {
                        throw response;
                    }
                });
            };
        },
    }
};

/**
 * OrderApi - factory interface
 * @export
 */
export const OrderApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
    return {
        /**
         * 
         * @param {number} courseId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiOrderCourseIdGet(courseId: number, options?: any) {
            return OrderApiFp(configuration).apiOrderCourseIdGet(courseId, options)(fetch, basePath);
        },
        /**
         * 
         * @param {OrderViewModel} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiOrderCreatePost(body?: OrderViewModel, options?: any) {
            return OrderApiFp(configuration).apiOrderCreatePost(body, options)(fetch, basePath);
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiOrderGet(options?: any) {
            return OrderApiFp(configuration).apiOrderGet(options)(fetch, basePath);
        },
    };
};

/**
 * OrderApi - object-oriented interface
 * @export
 * @class OrderApi
 * @extends {BaseAPI}
 */
export class OrderApi extends BaseAPI {
    /**
     * 
     * @param {number} courseId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OrderApi
     */
    public apiOrderCourseIdGet(courseId: number, options?: any) {
        return OrderApiFp(this.configuration).apiOrderCourseIdGet(courseId, options)(this.fetch, this.basePath);
    }

    /**
     * 
     * @param {OrderViewModel} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OrderApi
     */
    public apiOrderCreatePost(body?: OrderViewModel, options?: any) {
        return OrderApiFp(this.configuration).apiOrderCreatePost(body, options)(this.fetch, this.basePath);
    }

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OrderApi
     */
    public apiOrderGet(options?: any) {
        return OrderApiFp(this.configuration).apiOrderGet(options)(this.fetch, this.basePath);
    }

}
