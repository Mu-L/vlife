import { memo, useCallback, useEffect, useState } from "react";
import { styled } from "styled-components";
import classNames from "classnames";

const Shell = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  color: ${(props) => props.theme.token?.colorTextSecondary};
`;
const NavIcon = styled.span`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: solid 1px ${(props) => props.theme.token?.colorTextSecondary};
  line-height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(-1px);
  font-size: 12px;
  &.selected {
    background-color: blue;
    border-color: blue;
    color: #fff;
  }
`;
export interface INavItem {
  key: string;
  label: React.ReactElement | string | undefined;
}

export const NavTabs = memo(
  (props: {
    options: INavItem[];
    defaultValue?: string;
    value?: string;
    onChange?: (value?: string) => void;
  }) => {
    const { defaultValue, value, options, onChange } = props;
    const [inputValue, setInputValue] = useState<string | undefined>(
      defaultValue || value || props.options?.[0]?.key
    );

    useEffect(() => {
      setInputValue(value);
    }, [value]);

    const handleItemClick = useCallback(
      (key: string) => {
        setInputValue(key);
        onChange?.(key);
      },
      [onChange]
    );

    return (
      <Shell className="nav-tabs  space-x-1 ">
        {options?.map((option, index) => {
          return (
            <div
              className=" w-28 flex cursor-pointer p-1 items-center justify-center hover:bg-gray-100 rounded-md"
              key={option.key}
              // type={option.key === inputValue ? "link" : "text"}
              onClick={() => handleItemClick(option.key)}
            >
              <NavIcon
                role="img"
                className={classNames(
                  "anticon  mr-2",
                  option.key === inputValue ? "selected" : undefined
                )}
              >
                {index + 1}
              </NavIcon>

              <span
                className={classNames(
                  option.key === inputValue ? " text-blue-500" : undefined
                )}
              >
                {option.label}
              </span>
            </div>
          );
        })}
      </Shell>
    );
  }
);
