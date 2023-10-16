
/**
 * API的数据结构
 */
import { Result } from "@src/api/base";
import { DataType, sourceType, TsType } from '@src/dsl/schema/base';
 sourceType
 /**
  * 接口参数信息
  */
 export interface  ParamInfo{
   label: string; //参数名称
   sourceType:sourceType,//"fixed"|"field"|"dict"|"fieldInfo"|"fieldValue" //fieldInfo,根据字段模型信息提取 "dict" 目前没有用到 
   defValue?:any;//参数默认值
   fixed?:{// sourceType===fixed, 可以配置一下内容，如不配置则出现input输入框
     dicts?:{value:any,label:string}[]//自定义字典 前端配置时候根据这里选择
     promise?:()=>Promise<{value:any,label:string}[]>  //api返回的数据，表示api的入参也来源一异步接口
   },  
   dict?:{ //来源于系统字典
     dictCode:string
   },
   fieldInfo?:{//根据当前字段指定属性（需要其他字段的属性如何处理，后续应该也需要扩展）
     attr:string
   };
   must?: boolean; //是否必填,默认不是必须的
 }
 
 /**
  * 单个API定义信息
  */
 export interface ApiProp{
   label: string; //接口名称
   dataType: DataType; //出参数据类型（接口应只返回一种类型数据结构，所以这里不是数组类型）example：list|string|number
   entityType?:string;//出参实体类型，如果定义，则字段所在的实体类需要和他一致才能使用该接口
   dataModel?:TsType|string;//实际返回的数据模型类型,  dataModel的子类（后台）也可以
   //mode 接口服务表单，还是所有视图场景
   match?: {
     label?:string,
     dataType:DataType; //转换后的数据类型
     dataModel?:TsType|string; //转换后的模型
     func:((d:any)=>any)|{key:string,label:string,func:(d:any)=>any}[];//对于一个数据源可以有多种转换方式，采用不同的字段进行转换，如code,name,id都可以做select的value
   }[], //为了匹配组件的prop进行的转换函数；key 
   remark?: string; //接口说明
   codeDemo?: any; //返回代码示例(可作为组件预览，目前未采用)
   api?:  (params?: any) =>  Promise<Result<any>>; // 异步接口
   func?:(params?: any) =>  any;//同步方法
   //接口入参信息定义来源
   params?: {
     [key: string]:ParamInfo|string|boolean|number; // string 是表达式 
   }; 
 };
 
 /**
  * API对象数据结构
  */
 export interface ApiDef {
   [key: string]: ApiProp;
 }
 