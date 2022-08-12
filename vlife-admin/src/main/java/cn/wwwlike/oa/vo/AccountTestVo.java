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

package cn.wwwlike.oa.vo;

import cn.wwwlike.oa.entity.Account;
import cn.wwwlike.oa.entity.Project;
import cn.wwwlike.vlife.annotation.VClazz;
import cn.wwwlike.vlife.annotation.VField;
import cn.wwwlike.vlife.base.VoBean;
import lombok.Data;

import java.util.List;

/**
 * 类说明
 *
 * @author xiaoyu
 * @date 2022/6/28
 */
@Data
@VClazz(orders = "age_desc")
public class AccountTestVo implements VoBean<Account> {
    public String id;
    @VField(pathName = "account")
    public String username;
    //数据打平
    public String dept_name;
    /**
     * 查找project的外键是否有当前表，有则把project放入到这里
     */
    @VField(orders = "type_asc")
    List<Project> projects;

    List<String> project_id;

    List<String> project_name;

    List<Project> projectAccount_project;
    //路径错误,日志应该报错
    List<String> projectAccount_project_name;

//    List<String> projectAccount_project_name;


}
