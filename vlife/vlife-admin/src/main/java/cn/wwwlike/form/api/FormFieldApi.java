package cn.wwwlike.form.api;

import cn.wwwlike.form.entity.Form;
import cn.wwwlike.form.entity.FormField;
import cn.wwwlike.form.service.FormFieldService;
import cn.wwwlike.form.service.FormService;
import cn.wwwlike.form.vo.FieldSelect;
import cn.wwwlike.form.vo.FormFieldVo;
import cn.wwwlike.form.vo.FormVo;
import cn.wwwlike.vlife.base.Item;
import cn.wwwlike.vlife.core.VLifeApi;
import cn.wwwlike.vlife.objship.read.GlobalData;
import cn.wwwlike.vlife.query.QueryWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 列表字段接口;
 */
@RestController
@RequestMapping("/formField")
public class FormFieldApi extends VLifeApi<FormField, FormFieldService> {
    @Autowired
    FormService formService;

    /**
     * 保存列表字段;
     *
     * @param dto 列表字段;
     * @return 列表字段;
     */
    @PostMapping("/save")
    public FormField save(@RequestBody FormField dto) {
        return service.save(dto);
    }

    /**
     * 明细查询列表字段;
     *
     * @param id null;
     * @return 列表字段;
     */
    @GetMapping("/detail/{id}")
    public FormField detail(@PathVariable String id) {
        return service.findOne(id);
    }

    /**
     * 逻辑删除;
     *
     * @param id null;
     * @return 已删除数量;
     */
    @DeleteMapping("/remove/{id}")
    public Long remove(@PathVariable String id) {
        return service.remove(id);
    }

    /**
     * 查询当前表和子表能分组的字段
     * @param formId
     * @return
     */
    @GetMapping("/list/groupOption")
    public List<FieldSelect> groupOption(String formId) {
        if (formId == null) {
            return new ArrayList<>();
        }
        FormVo formVo=formService.queryOne(FormVo.class,formId);
        List<FormFieldVo> groupField =service.groupField(formVo);
        List<FieldSelect> options= groupField.stream().map(f->new FieldSelect(f.getId(),f.getTitle())).collect(Collectors.toList());
        List<Class<? extends Item>> leftClz= GlobalData.entityDto(formVo.getEntityType()).getFkTableClz();
        groupField.stream().filter(f->f.getPathName().endsWith("Id")).forEach(f->{
            FormVo subFormVo=formService.query(FormVo.class,QueryWrapper.of(Form.class).eq("type", f.getEntityType())).get(0);
            List<FormFieldVo>  subGroupField=service.groupField(subFormVo);
            options.addAll(subGroupField.stream().map(ff->new FieldSelect(ff.getId(),f.getTitle()+"."+ff.getTitle())).collect(Collectors.toList()));
        });

//        leftClz.stream().forEach(clz->{
//            FormVo subFormVo=formService.query(FormVo.class,QueryWrapper.of(Form.class).eq("type", StringUtils.uncapitalize(clz.getSimpleName()))).get(0);
//            List<FormFieldVo>  subGroupField=service.groupField(subFormVo);
//            options.addAll(subGroupField.stream().map(f->new FieldSelect(f.getId(),subFormVo.getName()+"."+f.getTitle())).collect(Collectors.toList()));
//        });
        return options;
    }

    /**
     * 查询表的字段信息
     * @param formId
     * @return
     */
    @GetMapping("/list/all")
    public List<FormField> listAll(String formId) {
        if (formId == null) {
            return new ArrayList<>();
        }
        return service.find(QueryWrapper.of(FormField.class).eq("formId", formId));
    }

    /**
     * 根据外键关键字段查询关联表的字段信息
     * @param realationFieldId 外键关联字段
     * @return
     */
    @GetMapping("/list/relationField")
    public List<FormField> listRelationField(String realationFieldId) {
        if (realationFieldId == null) {
            return new ArrayList<>();
        }
        FormField field=service.findOne(realationFieldId);
        //外键
        if(!field.getFieldName().equals("id")&&field.getEntityFieldName().equals("id")){
            return service.find(QueryWrapper.of(FormField.class).eq("entityType", field.getEntityType(), Form.class)
                    .eq("itemType", "entity", Form.class)
            );
        }
        return new ArrayList<>();
    }


    /**
     * 能够后参报表统计的字段
     * id，日期
     * @param formId
     * @return
     */
    @GetMapping("/list/report")
    public List<FormField> listReport(String formId) {
        if (formId == null) {
            return new ArrayList<>();
        }
        return service.find(QueryWrapper.of(FormField.class).eq("formId", formId));
    }
}
