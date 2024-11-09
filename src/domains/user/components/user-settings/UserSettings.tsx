import { ChangeEvent, FC } from 'react';
import { Button, Dimmer, Form, Icon, Input, Message, MessageHeader } from 'semantic-ui-react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import useUserSettings from '../../hooks/useUserSettings';
import DatePicker from 'react-datepicker';
import { UserModel } from '@PlayAb/shared';

interface UserSettingsProps {
  userDetails: UserModel;
}

const UserSettingsComponent: FC<UserSettingsProps> = ({ userDetails }) => {
  const {
    modal,
    form
  } = useUserSettings();

  console.log('gaga--------------------------userDetailsuserDetailsuserDetails-----------', userDetails);
  if (!userDetails) return null;

  console.log('gaga-------------------------------------UserSettingsComponent', userDetails);
  return (<div data-testid="UserSettings">
      <Icon
        circular
        inverted
        onClick={modal.handleOpen}
        className={'cursor-pointer !text-xl !mt-[-3px]'}
        name="setting"
      />
      <Dimmer className={classNames({})} active={modal.active}>
        <div className={'flex flex-col p-4 h-full relative'}>
          <div className={'flex flex-row items-start justify-between h-12'}>
            <span className={'dark:text-white text-2xl'}>Settings</span>
            <Icon
              circular
              inverted
              onClick={modal.handleCLose}
              className={'cursor-pointer !text-xl !mt-[-3px]'}
              name="close"
            />
          </div>
          <hr />

          <Form className={'flex flex-col p-3 w-[360px]'} onSubmit={form.submit}>
            <input hidden name={'email'} key={userDetails._id} defaultValue={userDetails._id} />
            <div className={'text-xl mb-3 text-left'}>{userDetails.build}</div>

            <div className={'form-values flex-1'}>
              <div className={'flex flex-col items-start mb-5 '}>
                <span className={'text-md mb-2'}>Change Date Created</span>

                <div className={'flex flex-row relative'}>
                  <Button
                    inverted
                    name={'createdAt'}
                    color="green"
                    size={'small'}
                    circular
                    type={'button'}
                    active={!!form.formFieldState.get('createdAt')}
                    onClick={() => {
                      form.patchValues('createdAt', form.formFieldState.get('createdAt') ?? dayjs().subtract(1, 'h').toDate());
                    }}
                    onMouseLeave={(e: ChangeEvent<HTMLButtonElement>) => e.target.blur()}
                  >
                    Yes
                  </Button>
                  {!!form.formFieldState.get('createdAt') && (<DatePicker
                      className={'opacity-0 absolute'}
                      popperClassName={'relative !left-[-30px]'}
                      autoFocus={true}
                      selected={new Date()}
                      onFocus={(date) => {
                        form.patchValues('createdAt', date);
                      }}
                      onChange={(date) => {
                        form.patchValues('createdAt', date);
                      }}
                    />)}
                </div>
              </div>
              <div className={'flex flex-col items-start mb-5'}>
                <span className={'text-md mb-2'}>Change Time</span>

                <Button
                  inverted
                  name={'updatedAt'}
                  color="green"
                  size={'small'}
                  circular
                  type={'button'}
                  active={!!form.formFieldState.get('updatedAt')}
                  onClick={() => {
                    form.patchValues('updatedAt', form.formFieldState.get('updatedAt') ?? dayjs().subtract(4, 'd').toDate());
                  }}
                  onMouseLeave={(e: ChangeEvent<HTMLButtonElement>) => e.target.blur()}
                >
                  Yes
                </Button>
              </div>
              <div className={'flex flex-col items-start mb-5'}>
                <span className={'text-md mb-2'}>Set Auto Login</span>
                <div className={'flex flex-row'}>
                  <Button
                    name={'data.settings.electronAutoLogin'}
                    inverted
                    color="green"
                    size={'small'}
                    circular
                    type={'button'}
                    active={form.formFieldState.get('data.settings.electronAutoLogin') === true}
                    onClick={() => form.patchValues('data.settings.electronAutoLogin', true)}
                    onMouseLeave={(e: ChangeEvent<HTMLButtonElement>) => e.target.blur()}
                  >
                    True
                  </Button>
                  <Button
                    name={'data.settings.electronAutoLogin'}
                    inverted
                    color="red"
                    size={'small'}
                    circular
                    type={'button'}
                    active={form.formFieldState.get('data.settings.electronAutoLogin') === false}
                    onClick={() => form.patchValues('data.settings.electronAutoLogin', false)}
                    onMouseLeave={(e: ChangeEvent<HTMLButtonElement>) => e.target.blur()}
                  >
                    False
                  </Button>
                </div>
              </div>
              <div className={'flex flex-col items-start mb-5'}>
                <span className={'text-md mb-2'}>Set Done</span>
                <div className={'flex flex-row'}>
                  <Button
                    name={'data.weeklyStatus.done'}
                    inverted
                    color="green"
                    size={'small'}
                    circular
                    type={'button'}
                    active={form.formFieldState.get('data.weeklyStatus.done') === true}
                    onClick={() => form.patchValues('data.weeklyStatus.done', true)}
                    onMouseLeave={(e: ChangeEvent<HTMLButtonElement>) => e.target.blur()}
                  >
                    True
                  </Button>
                  <Button
                    name={'data.weeklyStatus.done'}
                    inverted
                    color="red"
                    size={'small'}
                    circular
                    type={'button'}
                    active={form.formFieldState.get('data.weeklyStatus.done') === false}
                    onClick={() => form.patchValues('data.weeklyStatus.done', false)}
                    onMouseLeave={(e: ChangeEvent<HTMLButtonElement>) => e.target.blur()}
                  >
                    False
                  </Button>
                </div>
              </div>
              <div className={'flex flex-col items-start mb-5'}>
                <span className={'text-md mb-2'}>Set Two Factor Auth</span>
                <div className={'w-full'}>
                  <div className={'mt-1 mb-2'}>{userDetails.data.userSession?.TWO_FACTOR_AUTH}</div>

                  <Input className={'w-full'} placeholder="Two factor auth">
                    <input
                      key={userDetails.data.userSession?.TWO_FACTOR_AUTH}
                      name={'data.userSession.TWO_FACTOR_AUTH'}
                      defaultValue={userDetails.data.userSession?.TWO_FACTOR_AUTH}
                    />
                  </Input>
                </div>
              </div>
            </div>
            <hr className={'mt-2 mb-6'} />
            <Input className={'w-full mb-2'} placeholder="Password">
              <input name={'password'} />
            </Input>
            <Button loading={form.loading} className={'w-full !bg-violet-500 !text-white'} type="submit">
              Update
            </Button>
          </Form>
          <div className={'flex items-center h-[110px]'}>
            <Message hidden={!form.error} className={'text-left w-full'} negative>
              <MessageHeader>Error</MessageHeader>
              <p>{form.error}</p>
            </Message>
          </div>
        </div>
      </Dimmer>
    </div>);
};
UserSettingsComponent.displayName = 'UserSettings';
export default UserSettingsComponent;
