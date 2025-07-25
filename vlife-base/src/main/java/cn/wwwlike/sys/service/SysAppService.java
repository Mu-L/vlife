/*
 *  vlife http://github.com/wwwlike/vlife
 *
 *  Copyright (C)  2018-2022 vlife
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

package cn.wwwlike.sys.service;
import cn.wwwlike.sys.dao.SysAppDao;
import cn.wwwlike.sys.entity.SysApp;
import cn.wwwlike.vlife.core.VLifeService;
import cn.wwwlike.vlife.query.QueryWrapper;
import org.springframework.stereotype.Service;

@Service
public class SysAppService extends VLifeService<SysApp, SysAppDao> {

    /**
     * 根据模型Class路径获取应用信息
     * 倒数第三个包名是appKey
     */
    public SysApp getAppByClassPath(Class modelClazz) {
        String [] classPackage=modelClazz.getName().split("\\.");
        String appKey=classPackage[classPackage.length-3];
        return find(QueryWrapper.of(SysApp.class).eq("appKey",appKey)).get(0);
    }
}
