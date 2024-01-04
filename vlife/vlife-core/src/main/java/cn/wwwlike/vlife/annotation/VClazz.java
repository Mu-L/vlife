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

package cn.wwwlike.vlife.annotation;

import cn.wwwlike.base.common.RequestTypeEnum;
import cn.wwwlike.vlife.base.IdBean;
import cn.wwwlike.vlife.base.Item;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static cn.wwwlike.vlife.dict.Constants.DEFAULT_ORDER_TYPE;

/**
 * 所有pojo类注解，约定之外增加灵活性
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface VClazz {
    /**
     * 删除当前实体，把本实体id作为外键需要清除的实体class数组
     */
    Class<? extends Item>[] clear() default {};
    /**
     * 删除当前实体，把本实体id作为外键需要级联删除的实体Class数组
     */
    Class<? extends Item>[] remove() default {};
    /**
     * 删除当前实体，不级联操作的实体
     */
    Class<? extends Item>[] nothing() default {};
    /**
     * 禁止删除：有关联外键,则不允许删除的实体
     */
    Class<? extends Item>[] unableRm() default {};

    /**
     * 是否业务表
     * 业务表和非业务表在生成api上有区别(待)
     */
    boolean isBusiness() default false;

    /**
     * 默认实体类查询的排序表达式
     * "createDate_desc,code_asc"多字段用逗号分隔，字段与排序用下划线分隔，
     **/
    String orders() default DEFAULT_ORDER_TYPE;

    /**
     * 实体主字段label表达式
     * 用非字母的字符将表达式分隔，分隔后的数组能对应到字段的则替换该表达式的字母
     */
    String label() default "" ;

}
