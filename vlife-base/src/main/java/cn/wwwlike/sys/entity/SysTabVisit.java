package cn.wwwlike.sys.entity;

import cn.wwwlike.vlife.bean.DbEntity;
import lombok.Data;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 视图访问授权
 * 查询授权，默认该页签所有操作权限(button)也授权，
 */
@Table
@Setter
@Entity
public class SysTabVisit extends DbEntity {
    //视图
    public String sysTabId;
    //关联角色
    public String sysGroupId;
    //关联部门
    public String sysDeptId;
    //关联用户
    public String sysUserId;
    /**
     * 关联按钮集合
     */
    public String visitButtonIds;

    public String getSysTabId() {
        return sysTabId;
    }

    public String getSysGroupId() {
        return sysGroupId;
    }

    public String getSysDeptId() {
        return sysDeptId;
    }

    public String getSysUserId() {
        return sysUserId;
    }
    @Column(length = 500)
    public String getVisitButtonIds() {
        return visitButtonIds;
    }
}
