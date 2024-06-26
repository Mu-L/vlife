//vf级联选择组件
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ITreeData, VfBaseProps } from "@src/dsl/component";
import classNames from "classnames";
import { useUpdateEffect } from "ahooks";

export interface VfNestedSelectorProps extends VfBaseProps<string[]> {
  datas: ITreeData[]; //可选择的数据
  emptyDesc: string; //空记录说明
}

export default ({
  datas, //可选择的数据
  value,
  className,
  emptyDesc = "没有提供可进行选取的数据",
  onDataChange,
}: VfNestedSelectorProps) => {
  const [selected, setSelected] = useState<string[]>(value || []);
  useEffect(() => {
    setSelected(value || []);
  }, [value]);

  useUpdateEffect(() => {
    if (JSON.stringify(selected) !== JSON.stringify(value)) {
      onDataChange(selected);
    }
  }, [selected]);
  //第一列选择项value
  const [level1, setLevel1] = useState<string>();

  const level1Datas = useMemo(() => {
    return datas?.filter((form) => form.children && form.children.length > 0);
  }, [datas]);

  const lineClassName =
    " p-1 px-3  !cursor-pointer border-b border-dashed border-1 hover:bg-slate-50 ";

  //模块选中明细
  const modelSelected = useCallback(
    (form: ITreeData): ITreeData[] => {
      if (form.children && selected) {
        return form.children.filter((d) => selected.includes(d.value));
      }
      return [];
    },
    [datas, selected]
  );

  //所有子集数据量之和
  const subsTotal = useMemo((): number => {
    return (
      datas?.reduce(
        (acc, curr) =>
          acc + (curr && curr.children ? curr.children?.length : 0),
        0
      ) || 0
    );
  }, [datas]);
  return (
    <div className={`flex h-96 ${className}`}>
      {subsTotal > 0 ? (
        <>
          <div className=" w-1/3 border h-full overflow-y-auto gap-y-1">
            <div
              className={`${lineClassName} hover:bg-slate-50 ${classNames({
                "bg-blue-100": level1 === undefined,
              })}`}
              onClick={() => {
                setLevel1(undefined);
              }}
            >
              全部({selected?.length || 0}/{subsTotal}
              ))
            </div>

            {level1Datas?.map((d) => (
              <div
                className={`${lineClassName} hover:bg-slate-100 ${classNames({
                  "font-bold": modelSelected(d).length > 0,
                  "bg-blue-100": d.value === level1,
                })}`}
                onClick={() => {
                  setLevel1(d.value);
                }}
                key={d.value}
              >
                {d.label}({modelSelected(d).length}/
                {d.children && d.children.length})
              </div>
            ))}
          </div>
          <div className=" w-1/3 border h-full overflow-y-auto gap-y-1">
            {level1Datas?.map(
              (form) =>
                (level1 === undefined || form.value === level1) && (
                  <div key={`form${form.value}}`}>
                    <div
                      className={`${lineClassName}  font-bold ${classNames({
                        " bg-blue-50 ": modelSelected(form).length > 0,
                      })}`}
                    >
                      {form.label}
                    </div>
                    {form.children?.map((d) => {
                      return (
                        <div
                          key={d.value}
                          onClick={() => {
                            setSelected((s) => {
                              if (s && s.includes(d.value)) {
                                return s.filter((_d) => _d !== d.value);
                              } else if (s && !s.includes(d.value)) {
                                return [...s, d.value];
                              } else {
                                return [d.value];
                              }
                            });
                          }}
                          className={` flex p-1 px-3 justify-between  !cursor-pointer border-b border-dashed border-1 hover:bg-slate-50
                 
                `}
                        >
                          <div>&nbsp;&nbsp;&nbsp;{d.label}</div>
                          <div>
                            {selected?.includes(d.value) ? (
                              <i className="icon-check_box1 w-6" />
                            ) : (
                              <i className="icon-check_box_outline_blank  w-6" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )
            )}
          </div>
          <div className=" w-1/3 bg-yellow-50  overflow-y-auto border ">
            {level1Datas
              ?.filter((form) => modelSelected(form).length > 0)
              .map((form) => (
                <div key={`form${form.value}}`}>
                  <div
                    className={`${lineClassName}  font-bold ${classNames({
                      " bg-blue-50 ": modelSelected(form).length > 0,
                    })}`}
                  >
                    {form.label}
                  </div>
                  {form.children
                    ?.filter((c) => selected.includes(c.value))
                    ?.map((d) => {
                      return (
                        <div
                          key={d.value}
                          className={` flex p-1 px-3 justify-between border-b border-dashed border-1 hover:bg-slate-50
                 
                `}
                        >
                          <div>&nbsp;&nbsp;&nbsp;{d.label}</div>
                          <div
                            onClick={() => {
                              setSelected((s) => {
                                return s.filter((_d) => _d !== d.value);
                              });
                            }}
                            className="cursor-pointer"
                          >
                            <i className="icon-close  w-6" />
                          </div>
                        </div>
                      );
                    })}
                </div>
              ))}
          </div>
        </>
      ) : (
        <div className=" text-center">{emptyDesc}</div>
      )}
    </div>
  );
};
