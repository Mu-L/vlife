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


import cn.wwwlike.vlife.annotation.VField;
import cn.wwwlike.vlife.bean.DbEntity;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 权限资源
 */
@Data
@Entity
@Table
public class SysResources extends DbEntity{
    /**
     * 资源名称
     * 第一行注释，用户可修改
     */
    public String name;

    /**
     * 接口注释
     * 第一行注释
     */
    public String javaName;
    /**
     * 接口说明
     * 第二行注释
     */
    public String remark;

    /**
     * 接口地址
     * 全局唯一
     */
    public String url;
    /**
     * 实体标识
     */
    public String entityType;
    /**
     *  所属模型
     */
    public String formId;
    /**
     * 接口文件
     * className
     */
    public String actionType;
    /**
     * 权限code
     * 接口URL用“：”分隔的形式 sysUser:save ->sysUser/save
     */
    public String code;
    /**
     * 图标
     */
    public String icon;
    /**
     * 归属菜单
     * 有值那么该资源就需要授权才能访问
     */
    public String sysMenuId;
    /**
     * 主要接口
     * 作为访问菜单的必备接口
     */
    public boolean menuRequired;
    /**
     * 授权情况
     * single 独立授权 noPermission 无需授权 extend 继承授权
     * 后2类都不会展示给用户看
     */
    public String permission;
    /**
     * 归属角色
     * 资源与菜单关联后则可以参与与角色的关联
     */
    public String sysRoleId;
    /**
     * 上级资源
     * 当前地址包涵的地址对应的接口及上级资源 /sysUser/save/userDto的上级资源是 /save/sysUser
     */
    public String pcode;

    /**
     * 请求方式
     */
    public String methedType;

    /**
     * 接口分类
     * add/edit/delete/query/import/export
     */
    public String resourceType;
}
