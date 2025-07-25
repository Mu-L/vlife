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

package cn.wwwlike.sys.entity;

import cn.wwwlike.vlife.annotation.VClazz;
import cn.wwwlike.vlife.annotation.VField;
import cn.wwwlike.vlife.bean.DbEntity;
import lombok.Data;
import org.springframework.data.domain.Sort;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 字典表
 * 待：树形字典/对字典分类粒度
 */
@Data
@Table(name = "sys_dict")
@Entity
@VClazz(orders = "code_asc,sort_asc")
public class SysDict extends DbEntity {
    /**
     * 绑定字段
     */
    public String formFieldId;
    /**
     * 字典层级
     */
    public Integer level;
    /**
     * 字典项编码
     * 系统级字段code有值，字段级字段采用formFieldId字段
     */
    public String code;
    /**
     *选项值
     */
    public String val;
    /**
     *选项名
     */
    public String title;
    /**
     * 排序号
     */
    public Integer sort;
    /**
     * 列表色块
     */
    @VField(dictCode = "DICT_COLOR")
    public String color;
    /**
     * 系统项
     * 通过类文件导入的都是系统项，不能删除
     */
    public Boolean sys;
}
