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

package cn.wwwlike.vlife.dict;

import javax.inject.Named;

/**
 * 框架底层字典2
 * 用户不可见，不可扩充，页面可翻译
 */
public class VCT {

    @Named("处理状态")
    public static final class ITEM_STATE {
        @Named("正常")
        public final static String NORMAL = "1";
        @Named("异常")
        public final static String ERROR = "-1";
        @Named("待处理")
        public final static String WAIT = "0";
    }

    @Named("数据类型")
    public static final class ITEM_TYPE {
        @Named("基础数据类型")
        public final static String BASIC = "basic";
        @Named("对象类型")
        public final static String OBJECT = "object";
        @Named("数组")
        public final static String ARRAY = "array";
        @Named("集合")
        public final static String LIST = "list";
        @Named("主键列表")
        public final static String IDS = "IDS";
        @Named("实体类")
        public final static String ENTITY = "entity";
        @Named("VO对象")
        public final static String VO = "vo";
        @Named("FK外键表模型")
        public final static String FK = "fk";
        @Named("关联模型")
        public final static String Relation = "relation";
        @Named("提交对象")
        public final static String SAVE = "save";
        @Named("查询对象")
        public final static String REQ = "req";
        @Named("API对象")
        public final static String API = "api";
        @Named("一般模型")
        public final static String BEAN = "bean";
    }

    @Named("删除方式")
    public static final class DELETE_TYPE {
        @Named("禁止删除")
        public final static String UNABLE = "unable";
        @Named("物理删除")
        public final static String DELETE = "delete";
        @Named("逻辑删除")
        public final static String REMOVE = "remove";
        @Named("关联清除")
        public final static String CLEAR = "clear";
        @Named("不关联操作")
        public final static String NOTHING = "nothing";
    }

    @Named("按钮应用场景")
    public static final class BUTTON_POSITION {
        @Named("列表工具栏")
        public final static String tableToolbar = "tableToolbar";
        @Named("表格操作列")
        public final static String tableLine = "tableLine";
    }

    @Named("统计类型")
    public static final class ITEM_FUNC {
        @Named("计数")
        public final static String COUNT = "count";
        @Named("求和")
        public final static String SUM = "sum";
        @Named("平均")
        public final static String AVG = "avg";
    }

    @Named("日期维度")
    public static final class DATE_WD{
        @Named("按年")
        public final static String Date_Year = "date_year";
        @Named("按月")
        public final static String Date_Month = "date_month";
        @Named("按季")
        public final static String Date_Month3 = "date_month3";
    }

    @Named("规则响应类型")
    public static final class ActionType {
        @Named("显示")
        public final static String SHOW = "show";
        @Named("隐藏")
        public final static String HIDE = "hide";
        @Named("可编辑")
        public final static String EDITABLE = "editable";
        @Named("只读")
        public final static String READPRETTY = "readPretty";
        @Named("必填")
        public final static String REQUIRED = "required";
    }
}
