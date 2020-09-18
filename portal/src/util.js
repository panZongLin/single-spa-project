import * as singleSpa from 'single-spa';
import { createHashHistory } from 'history';

function isArray(o){
    return Object.prototype.toString.call(o)=='[object Array]';
}

//当前路由前缀是否匹配
//由路由分发应用，这是微前端与常规项目最不一样的点
export function hashPrefix(hash) {
	if (!hash) {
		return () => true;
	}
    return function (location) {
        let isShow = false
        //如果该应用 有多个需要匹配的路劲
        if(isArray(hash)){
            hash.forEach(path => {
                if(location.hash.startsWith(`#${path}`)){
                    isShow = true
                }
            });
        }
        // 普通情况
        else if(location.hash.startsWith(`#${hash}`)){
            isShow = true
		}		
        return isShow;
    }
}

//注册应用
export async function loadApp(name, hash, appURL, storeURL) {
	let storeModule = {};

	try {	
		storeModule = storeURL ? await SystemJS.import(storeURL) : null;
		storeModule = storeModule ? storeModule.default : null;
	} catch (e) {
		console.log(`无法加载 ${name}Store.`, e);
	}
	// SystemJS.import(appURL).then((res)=> {
	// 	console.log(`${name} loadApp`, res)
	// }) 	
	singleSpa.registerApplication(
		name,
		() => SystemJS.import(appURL),
		hashPrefix(hash),
		{
			history: createHashHistory(),
			[`${name}Store`]: storeModule
		}
	);
}
