import React, {
  ChangeEvent,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import classNames from "classnames";
import { Button, Form, Icon, Input, Segment } from "semantic-ui-react";
import { API } from "@services/api.service";
import { UserDetailModel } from "@models/custom.models";
import { mergeMap } from "rxjs";
import { get, omit, set } from "lodash";
import moment from "moment";
import { ElementComponent } from "@app/shared/component/element-loader.component";

interface Config {
  isOpen: boolean;
  email: string;
  password: string;
}

interface Props {
  config: {
    email: string;
  };
}

class State {
  config: Config = {
    isOpen: false,
    email: "",
    password: "",
  };
  loading = false;

  userDetails: UserDetailModel = {} as UserDetailModel;

  constructor(props: Props) {
    Object.assign(this.config, props.config);
  }
}

export const UserSettingsComponent = memo((props: Props) => {
  const [state, setState] = useState<State>(new State(props));

  useEffect(() => {
    //setState(prevState => ({ ...prevState, config: props.config }));
    setState((prevState) => ({
      ...prevState,
      config: { ...prevState.config, ...props.config },
    }));
  }, [props]);

  const handleUpdateClick = useCallback(() => {
    console.log(
      "gaga----------------------state.config.email---------------",
      state.config,
    );
    setState((prevState) => ({ ...prevState, loading: true }));
    API.$RealmDB
      .login(state.config.email, state.config.password)
      .pipe(
        mergeMap(() => {
          console.log(
            "gaga------------------------------------to update",
            JSON.stringify(
              {
                ...state.userDetails,
                _id: state.config.email,
              },
              null,
              2,
            ),
          );
          return API.upsertUserData({
            ...state.userDetails,
            _id: state.config.email,
          } as UserDetailModel);
        }),
      )
      .subscribe(() => {
        setState((prevState) => ({ ...prevState, loading: false }));
      });
  }, [state.config]);

  const handleOnInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      config: { ...prevState.config, password: e.target.value },
    }));
  }, []);

  const handleUserDetailModelUpdate = useCallback(
    (e: React.SyntheticEvent<HTMLElement>, data: any) => {
      e.preventDefault();
      const value = data["data-value"];

      Object.keys(value).forEach((key) => {
        const prevValue = get(state.userDetails, key);
        const nextValue = value[key];
        if (key === "updatedAt" && !!prevValue) {
          delete state.userDetails.updatedAt;
          Object.assign(state.userDetails, omit(state.userDetails, key));
        } else if (prevValue !== nextValue) {
          set(state.userDetails, key, value[key]);
        } else {
          Object.assign(state.userDetails, omit(state.userDetails, key));
        }
      });

      setState((prevState) => ({
        ...prevState,
        userDetails: state.userDetails,
      }));
    },
    [state.userDetails],
  );

  const handleRemoveFocus = useCallback(
    (e: ChangeEvent<HTMLElement>, data: any) => {
      e.preventDefault();
      e.target.blur();
    },
    [],
  );

  return (
    <div
      className={classNames({
        "settings-wrap": true,
        open: state.config.isOpen,
      })}
    >
      <Segment inverted>
        <span className={"ttl"}>Settings</span>
        <hr />

        <div className={"content"}>
          <div className={"content-item"}>
            <span>For Account</span>
            <span>{state.config.email}</span>
          </div>
          <div className={"content-item"}>
            <span>Change Time</span>
            <Button
              inverted
              color="green"
              size={"small"}
              circular
              active={!!state.userDetails.updatedAt}
              data-value={{ updatedAt: moment().subtract(1, "hour").toDate() }}
              onClick={handleUserDetailModelUpdate}
              onMouseOut={handleRemoveFocus}
            >
              Yes
            </Button>
          </div>
          <div className={"content-item"}>
            <span>Set Bet</span>
            <div className={"btn-wrap"}>
              <Button
                tabIndex={-1}
                inverted
                color="orange"
                size={"small"}
                circular
                data-value={{ "data.settings.bet": "5" }}
                active={state.userDetails.data?.settings?.bet === "5"}
                onClick={handleUserDetailModelUpdate}
                onMouseOut={handleRemoveFocus}
              >
                5
              </Button>
              <Button
                tabIndex={-1}
                inverted
                color="yellow"
                size={"small"}
                circular
                data-value={{ "data.settings.bet": "15" }}
                active={state.userDetails.data?.settings?.bet === "15"}
                onClick={handleUserDetailModelUpdate}
                onMouseOut={handleRemoveFocus}
              >
                15
              </Button>
              <Button
                tabIndex={-1}
                inverted
                color="green"
                size={"small"}
                circular
                active={state.userDetails.data?.settings?.bet === "25"}
                data-value={{ "data.settings.bet": "25" }}
                onClick={handleUserDetailModelUpdate}
                onMouseOut={handleRemoveFocus}
              >
                25
              </Button>
            </div>
          </div>
          <div className={"content-item"}>
            <span>Set Done</span>
            <div className={"btn-wrap"}>
              <Button
                tabIndex={-1}
                inverted
                color="red"
                size={"small"}
                circular
                data-value={{ "data.weekStatus.done": false }}
                active={state.userDetails.data?.weekStatus?.done === false}
                onClick={handleUserDetailModelUpdate}
                onMouseOut={handleRemoveFocus}
              >
                false
              </Button>
              <Button
                tabIndex={-1}
                inverted
                color="green"
                size={"small"}
                circular
                data-value={{ "data.weekStatus.done": true }}
                active={state.userDetails.data?.weekStatus?.done === true}
                onClick={handleUserDetailModelUpdate}
                onMouseOut={handleRemoveFocus}
              >
                true
              </Button>
            </div>
          </div>
          <div className={"content-item"}>
            <span>Set Auto Login</span>
            <div className={"btn-wrap"}>
              <Button
                tabIndex={-1}
                inverted
                color="red"
                size={"small"}
                circular
                data-value={{ "data.settings.electronAutoLogin": false }}
                active={
                  state.userDetails.data?.settings?.electronAutoLogin === false
                }
                onClick={handleUserDetailModelUpdate}
                onMouseOut={handleRemoveFocus}
              >
                false
              </Button>
              <Button
                tabIndex={-1}
                inverted
                color="green"
                size={"small"}
                circular
                data-value={{ "data.settings.electronAutoLogin": true }}
                active={
                  state.userDetails.data?.settings?.electronAutoLogin === true
                }
                onClick={handleUserDetailModelUpdate}
                onMouseOut={handleRemoveFocus}
              >
                true
              </Button>
            </div>
          </div>
        </div>
        <hr />
        <Form onSubmit={handleUpdateClick} className={"footer"}>
          <Input iconPosition="left" placeholder="Password">
            <Icon name="lock" />

            <input
              placeholder={"Password"}
              value={state.config.password}
              onInput={handleOnInput}
            />
          </Input>
          <Button type={"submit"}>Update</Button>
        </Form>
      </Segment>
      <ElementComponent loading={state.loading} />
    </div>
  );
});
