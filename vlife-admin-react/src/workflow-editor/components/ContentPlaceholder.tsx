import { memo } from "react";
import className from "classnames";
import { IWorkFlowNode } from "../interfaces";
import VfUserSelect from "@src/pages/sysManage/user/VfUserSelect";
import ConditionView from "@src/components/queryBuilder/component/ConditionView";

export interface ContentPlaceholderProps {
  text?: string; //未选择时的提示
  secondary?: boolean;
  node: IWorkFlowNode;
}
/**
 * 节点card面板
 */
export const ContentPlaceholder = memo((props: ContentPlaceholderProps) => {
  const { text, secondary, node } = props;
  return (
    <span className={className("text", secondary ? " secondary" : "")}>
      11
      {node?.approverSettings?.auditList && (
        <VfUserSelect
          onDataChange={() => {}}
          value={node?.approverSettings?.auditList}
          read={true}
        />
      )}
      {node?.conditions && <ConditionView condition={node.conditions} />}
      {node?.approverSettings?.auditList === undefined &&
        node.conditions === undefined && <>{text}</>}
    </span>
  );
});
