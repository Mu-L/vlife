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

package cn.wwwlike.auth.vo;

import cn.wwwlike.auth.entity.SysGroup;
import cn.wwwlike.vlife.base.VoBean;
import lombok.Data;

import java.util.List;

/**
 * 权限组数据对象封装
 *
 */
@Data
public class GroupVo implements VoBean<SysGroup> {
    public String id;
    public String filterType;
    /**
     * 通过角色查找对应的资源信息
     */
    public List<String> sysRoleGroup_sysRoleId;
    public List<String> sysRoleGroup_sysRole_sysResources_code;
    public List<String> sysRoleGroup_sysRole_sysResources_sysMenuId;
    public List<String> sysRoleGroup_sysRole_name;
    public List<String> sysRoleGroup_sysRole_sysResources_id;
    public List<String> sysRoleGroup_sysRole_sysMenu_id;
    /**
     * 通过权限组查找对应的资源信息
     */
    public List<String> sysGroupResources_sysResources_code;
    public List<String> sysGroupResources_sysResources_sysMenuId;



}
