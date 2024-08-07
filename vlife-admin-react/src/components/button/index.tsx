import React, { ReactNode, useCallback, useMemo, useState } from "react";
import {
  Button,
  Divider,
  Modal,
  TextArea,
  Tooltip,
  Typography,
} from "@douyinfe/semi-ui";
import classNames from "classnames";
import { VFBtn } from "./types";
import { Result } from "@src/api/base";
import { useNiceModal } from "@src/store";
import { useAuth } from "@src/context/auth-context";
import { isNull } from "lodash";
import { objectIncludes } from "@src/util/func";
import { useEffect } from "react";
import { IconSend } from "@douyinfe/semi-icons";

//封装的按钮组件
export default (props: Partial<VFBtn>) => {
  const { Text } = Typography;
  const formModal = useNiceModal("formModal");
  const vlifeModal = useNiceModal("vlifeModal");

  const [modal, contextHolder] = Modal.useModal();
  const config = {
    title: "This is a success message",
    content: "Context consumer",
  };

  const confirmModal = useNiceModal("confirmModal");
  const [loading, setLoading] = useState<boolean>();
  const { checkBtnPermission } = useAuth();
  const {
    datas,
    btnType = "button",
    actionType,
    position = "page",
    continueCreate,
    title,
    divider,
    icon,
    multiple = false,
    model,
    submitClose = false,
    submitConfirm,
    reaction,
    fieldOutApiParams,
    initData,
    otherBtns,
    className,
    entity,
    permissionCode,
    onFormilySubmitCheck,
    saveApi,
    loadApi,
    onFormBefore,
    onSubmitFinish,

    // onDataChange,
    onClick,
    onSaveBefore,
  } = props;
  const disabledHide = useMemo(() => {
    return props.disabledHide ||
      position === "tableLine" ||
      position === "formFooter" //这2个位置的按钮如果不可用则默认是隐藏不显示的
      ? true
      : false;
  }, [position, props.disabledHide]);

  const [disabled, setDisabled] = useState<boolean | undefined>(props.disabled);
  const [tooltip, setTooltip] = useState<string | undefined>(props.tooltip);
  const [btnData, setBtnData] = useState<any>();
  const [comment, setComment] = useState<string>();

  //权限码计算
  const _permissionCode = useMemo(() => {
    if (permissionCode) {
      return permissionCode;
    } else if (entity && saveApi && saveApi.name !== "savaApi") {
      return `${entity}:${saveApi.name}`;
      // actionType&&["save","delete","remove"].includes(actionType)
      // save|edit|delete
      // api
      // click 不用管权限
    } else if (entity && model) {
      return `${entity}:${actionType}:${model}`;
      // actionType&&["save","delete","remove"].includes(actionType)
      // save|edit|delete
      // api
      // click 不用管权限
    } else if (entity) {
      return `${entity}:${actionType}`;
    } else if (model) {
      return `${model}:${actionType}`;
    }

    // return (
    //   permissionCode ||
    //   (model && saveApi ? model + `:${saveApi.name}` : undefined)
    // );
  }, [permissionCode, model, entity, actionType, saveApi]);

  //按钮数据
  useEffect((): any => {
    if (datas) {
      if (position === "formFooter") {
        if (Array.isArray(datas)) {
          setBtnData(datas?.[0]);
        } else {
          setBtnData(datas);
        }
      } else {
        if (
          (multiple && Array.isArray(datas)) ||
          (!multiple && !Array.isArray(datas))
        ) {
          setBtnData(datas);
        } else if (multiple && !Array.isArray(datas)) {
          setBtnData([datas]);
        } else if (!multiple && Array.isArray(datas)) {
          setBtnData(datas?.[0]);
        }
      }
    }
  }, [datas, multiple]);

  // 鉴权方法
  const authPass = useMemo((): boolean => {
    return (
      (_permissionCode && checkBtnPermission(_permissionCode)) ||
      _permissionCode === undefined
    );
  }, [_permissionCode]);

  //设置按钮可用状态
  useEffect(() => {
    const setDisableAndTooltip = (matchResult: string | boolean) => {
      if (typeof matchResult === "string") {
        setDisabled(true);
        setTooltip(matchResult);
        // setBtn((btn) => {
        //   return { ...btn, tooltip: matchResult, disabled: true };
        // });
      } else if (typeof matchResult === "boolean") {
        setDisabled(!matchResult);
        // setBtn((btn) => {
        //   return { ...btn, disabled: !matchResult };
        // });
      }
    };
    let dataMatchTooltip = btnUsableMatch();
    if (dataMatchTooltip instanceof Promise) {
      dataMatchTooltip.then((d) => {
        setDisableAndTooltip(d);
      });
    } else {
      setDisableAndTooltip(dataMatchTooltip);
    }
  }, [btnData, props]);

  // 按钮是否可用
  const btnUsableMatch = useCallback(():
    | boolean
    | string
    | Promise<boolean | string> => {
    //按钮可用
    if (props.disabled !== true) {
      if (
        (props.actionType === "create" ||
          props.actionType === "save" ||
          props.allowEmpty === true) &&
        (btnData === null || btnData === undefined || btnData.id === undefined)
      ) {
        return true; //1. 新增无数据可用
      } else if (
        //任何字段都没有值判断
        btnData === undefined ||
        (Array.isArray(btnData) && btnData?.length === 0) ||
        (typeof btnData === "object" &&
          Object.values(btnData).every((value) => !value) === true)
      ) {
        return false;
      } else if (props.usableMatch === undefined) {
        //2 无其他数据动态匹配方式
        return true;
      } else if (typeof props.usableMatch === "object" && btnData) {
        //3. 采用对象值 eq方式匹配
        if (Array.isArray(btnData)) {
          return (
            //所有数据都满足
            btnData?.filter((a: any) => {
              return objectIncludes(a, props.usableMatch);
            }).length === btnData?.length
          );
        } else {
          return objectIncludes(btnData, props.usableMatch);
        }
      } else if (typeof props.usableMatch === "function") {
        if (props.usableMatch instanceof Promise<boolean | string>) {
          //异步函数转同步返回
          return props.usableMatch;
        } else {
          const match = props.usableMatch(btnData);
          return match === undefined && btnData && btnData.length > 0
            ? true
            : match;
        }
      }
      return false;
    } else {
      //按钮直接不可用
      return false;
    }
  }, [btnData, props]);
  //模态窗口按钮计算
  const modalBtns = useCallback(
    (_formData: any) => {
      // 1.  四种情况只显示自己和流程关联的按钮
      if (
        props.actionType === "api" ||
        props.actionType === "create" ||
        (props.actionType === "save" && _formData?.id === undefined) ||
        otherBtns === undefined
      ) {
        return otherBtns
          ? [
              props,
              ...otherBtns?.filter(
                (o) => o.model === props.model && o.actionType === "flow"
              ),
            ]
          : [props];
      } else if (
        // 2. modal关联显示多个按钮的情况; 主按钮是编辑保存，同时可以关联显示有模型且actionType->api的按钮
        props.model &&
        otherBtns &&
        (props.actionType === "save" || props.actionType === "edit")
      ) {
        return [
          props,
          ...otherBtns.filter(
            (o) =>
              o.model === props.model &&
              (o.actionType === "api" || o.actionType === "flow")
          ),
        ];
      }
      //其他情况都只显示当前一个按钮
      return [props];
    },
    [props, otherBtns]
  );

  // 修改了数据才往回传输数据
  const show = useCallback(() => {
    const modal = (formData: any) => {
      // alert(JSON.stringify(formData));
      const btns = otherBtns
        ? [props, ...otherBtns.filter((o) => o.model === props.model)]
        : [props];
      formModal.show({
        type: model,
        formData: formData,
        // activeKey: activeKey,
        fieldOutApiParams: fieldOutApiParams, //指定字段访问api取值的补充外部入参
        btns: modalBtns(formData), //取消掉btns简化逻辑，弹出层值显示一个按钮(create按钮新增完需要继承存在)
        terse: !saveApi ? true : false, //紧凑
        fontBold: !saveApi ? true : false, //加粗
        readPretty: actionType === "api",
        reaction: reaction,
      });
    };

    if (onFormBefore !== undefined) {
      //onFormBefore 优先级最高
      modal(onFormBefore(btnData));
    } else if (
      actionType === "create" ||
      (actionType === "save" && position === "tableToolbar")
    ) {
      modal(initData);
    } else if (loadApi === undefined) {
      modal(btnData || initData || {});
    } else if (btnData) {
      loadApi(btnData).then((d) => {
        modal(d.data);
      });
    }
  }, [btnData, props, reaction, modalBtns]);

  // 工作流审核框弹出
  const flowCommentShow = useCallback(() => {
    let commentTemp: string;
    Modal.info({
      title: `确认`,
      content: (
        <TextArea
          onChange={(s) => {
            commentTemp = s;
          }}
          rows={4}
          placeholder="请输入审核意见"
        />
      ),
      icon: <IconSend />,
      hasCancel: true,
      onOk: () => {
        submit({ comment: commentTemp });
      },
    });
  }, [btnData, comment]);

  //按钮提交 flowInfo审核的流程数据
  const submit = useCallback(
    (flowInfo?: any) => {
      const save = () => {
        setLoading(true);
        const saveResult = saveApi?.(
          flowInfo
            ? onSaveBefore
              ? onSaveBefore({ ...btnData, ...flowInfo })
              : { ...btnData, ...flowInfo }
            : onSaveBefore
            ? onSaveBefore(btnData)
            : btnData
        );
        const submitAfter = (data: any) => {
          setTimeout(() => {
            if (submitClose) {
              formModal.hide();
            }
            if (onSubmitFinish) {
              onSubmitFinish(data);
            }
            setLoading(undefined);
          }, 500);
        };
        if (saveResult instanceof Promise) {
          return saveResult.then(
            (d: Result<any>) => {
              submitAfter(d.data);
              return d.data;
            },
            (error: any) => {
              setTimeout(() => {
                setLoading(undefined);
              }, 500);
            }
          );
        } else {
          submitAfter(saveResult);
          return saveResult;
        }
      };

      if (saveApi && btnData) {
        return onFormilySubmitCheck
          ? onFormilySubmitCheck().then((dLboolean) => {
              return save();
            })
          : save();
      }
    },
    [position, btnData, comment]
  );

  const [customModalVisiable, setCustomModalVisiable] = useState(true);
  //按钮点击
  const btnClick = useCallback(() => {
    if (props.modal) {
      vlifeModal.show({
        title: title || "提交",
        children: props.modal,
        okFun: onClick,
        submitClose: props.submitClose,
      });

      // let modalOutData: any;
      // // setCustomModalVisiable(true);
      // Modal.info({
      //   width: 800,
      //   title,
      //   visible: customModalVisiable,
      //   footer: onClick ? (
      //     <div className="flex justify-end">
      //       <Button
      //         type="primary"
      //         onClick={() => {
      //           modalOutData && onClick(modalOutData);
      //           if (props.submitClose) {
      //             setCustomModalVisiable(false);
      //           }
      //         }}
      //       >
      //         {title || "提交"}
      //       </Button>
      //     </div>
      //   ) : (
      //     false
      //   ),
      //   content: (
      //     //modal->传入的弹出层包裹的组件
      // <>
      //   {React.cloneElement(modal, {
      //     //克隆组件，并给组件传入2个方法
      //     onDataChange: (__data: any) => {
      //       modalOutData = __data;
      //     },
      //     onFinish: () => {
      //       onSubmitFinish?.(modalOutData);
      //     },
      //   })}
      // </>
      //   ),
      // });
    } else if (onClick) {
      onClick(btnData);
    } else if (position !== "formFooter" && model) {
      //1 页面(非modal)的按钮，model不为空,则触发model的弹出
      show();
    } else if (props.comment && position !== "comment") {
      flowCommentShow();
    } else if (saveApi && btnData) {
      //2. 按钮触发接口调用
      if (submitConfirm) {
        // 需确认;
        confirmModal
          .show({
            title: `确认${title}${
              Array.isArray(btnData) ? btnData.length : "该"
            }条记录?`,
            saveFun: () => {
              return submit();
            },
          })
          .then((data: any) => {
            confirmModal.hide();
          });
      } else {
        return submit()?.then((d: any) => {
          return d;
        });
      }
    }
  }, [btnData, position, continueCreate, reaction, props, customModalVisiable]);

  // 按钮名称计算
  const btnTitle = useMemo((): string | ReactNode => {
    if (position === "formFooter") {
      if (
        actionType == "save" ||
        actionType == "create" ||
        actionType === "edit"
      ) {
        return "保存";
      }
    } else if (title === undefined) {
      if (actionType === "create") {
        return "新增";
      } else if (actionType === "edit") {
        return "修改";
      } else if (
        actionType === "save" &&
        position !== "tableToolbar" &&
        btnData
      ) {
        return "修改";
      } else if (
        actionType === "save" &&
        (btnData === undefined || position === "tableToolbar")
      ) {
        return "新增";
      }
    } else if (position === "tableToolbar") {
      if (actionType === "save" || actionType === "create") {
        if (isNull(title) || title === undefined) {
          return "新增";
        } else if (!title?.startsWith("新增")) {
          return "新增" + title;
        }
      }
    } else if (position === "tableLine") {
      if (actionType === "save" || actionType === "edit") {
        if (isNull(title) || title === undefined) {
          return "修改";
        } else {
          return title;
        }
      }
    }
    return title;
  }, [title, actionType, btnData, position]);

  const btnIcon = useMemo(() => {
    if (icon) {
      return icon;
    } else if (actionType === "create") {
      return <i className="  icon-add_circle_outline" />;
    } else {
      return <i className="  icon-gantt_chart" />;
    }
  }, [icon, actionType, position, btnData]);

  const BtnComp = useMemo((): ReactNode => {
    const Btn: any =
      btnType === "link" && position !== "formFooter" ? Text : Button;

    if (position === "dropdown" && disabled === true) {
      //dropdown场景不存在不可用但是可见的disable状态
      return <></>;
    }

    return btnType !== "icon" || position === "formFooter" ? (
      <>
        {position === "dropdown" && divider === true && (
          <Divider>{divider}</Divider>
        )}
        {position === "dropdown" && divider && typeof divider === "string" && (
          <Divider>
            <span className=" font-thin text-gray-800 text-xs">{divider}</span>
          </Divider>
        )}
        <Btn
          onClick={() => {
            if (!disabled) {
              btnClick();
            }
          }}
          loading={loading}
          theme={`${
            (actionType === "edit" ||
              actionType === "create" ||
              actionType === "save") &&
            disabled !== true &&
            position === "formFooter"
              ? "solid"
              : position === "dropdown"
              ? "borderless"
              : "light"
          }`}
          className={` ${className} hover:cursor-pointer  ${classNames({
            "cursor-pointer hover:text-blue-600 hover:font-bold":
              position === "tableLine",
            " !text-gray-800 !font-thin text-xs": position === "dropdown",
          })}`}
          icon={btnType === "link" ? undefined : btnIcon}
          disabled={disabled}
        >
          <span className=" space-x-2 items-center justify-center">
            {props.children ? props.children : btnTitle}
          </span>
        </Btn>
      </>
    ) : (
      //图标
      <div
        className="flex w-6 hover:cursor-pointer items-center justify-center rounded-md cursor-pointer px-2 "
        onClick={() => {
          if (!disabled) {
            btnClick();
          }
        }}
      >
        {tooltip === undefined && title ? (
          <Tooltip
            className={`${classNames({
              " text-gray-300": disabled === true,
            })}`}
            content={title}
          >
            {icon}
          </Tooltip>
        ) : (
          <span
            className={`${classNames({
              " text-gray-300": disabled === true,
            })}`}
          >
            {icon}
          </span>
        )}
      </div>
    );
  }, [
    btnData,
    divider,
    btnIcon,
    btnTitle,
    position,
    icon,
    props.children,
    className,
    disabled,
    loading,
    reaction,
  ]);
  return authPass && !(disabledHide && disabled === true) ? (
    <>
      {/* {initData.length} */}
      {tooltip && props.disabled === true ? (
        <Tooltip content={tooltip}>{BtnComp} </Tooltip>
      ) : (
        <>{BtnComp}</>
      )}
    </>
  ) : (
    <>{/* 没有权限 */}</>
  );
};
