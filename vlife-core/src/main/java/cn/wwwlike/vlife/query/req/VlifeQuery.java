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

package cn.wwwlike.vlife.query.req;

import cn.wwwlike.vlife.base.Item;
import cn.wwwlike.vlife.query.CustomQuery;
import cn.wwwlike.vlife.query.QueryWrapper;
import lombok.Data;

/**
 * 一般查询模型
 */
@Data
public class VlifeQuery<T extends Item> extends CustomQuery<T, QueryWrapper<T>>  {

    public VlifeQuery() {}


    public VlifeQuery(Class entityClz) {
        this.entityClz = entityClz;
    }

    @Override
    public QueryWrapper<T> instance() {
        return new QueryWrapper<T>(getEntityClz());
    }
}
