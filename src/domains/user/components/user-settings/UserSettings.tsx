import { ChangeEvent, FC } from 'react';
import { Button, Dimmer, Form, Icon, Input, Message, MessageHeader } from 'semantic-ui-react';
import useUserSettings from '@domains/user/hooks/useUserSettings.tsx';
import { UserDetailModel } from '@api/index.ts';
import classNames from 'classnames';
import dayjs from 'dayjs';

interface UserSettingsProps {
  userDetails: UserDetailModel[];
}

const UserSettingsComponent: FC<UserSettingsProps> = ({ userDetails }) => {

  const { modal, form } = useUserSettings();

  if (!userDetails.length) return null;

  return (
    <div data-testid='UserSettings'>
      <Icon
        circular
        inverted
        onClick={modal.handleOpen}
        className={'cursor-pointer pt-1 !text-xl'}
        name='setting' />
      <Dimmer
        className={classNames({})}
        active={modal.active}
      >
        <div className={'flex flex-col p-4 h-full relative'}>
          <div className={'flex flex-row items-start justify-between h-12'}>
            <span className={'dark:text-white text-2xl'}>Settings</span>
            <Icon
              circular
              inverted
              onClick={modal.handleCLose}
              className={'cursor-pointer pt-1 !text-xl'}
              name='close' />
          </div>
          <hr />


          <Form
            className={'flex flex-col p-3 w-[360px]'}
            onSubmit={form.submit}>
            <input
              hidden
              name={'email'}
              key={userDetails[0]._id}
              defaultValue={userDetails[0]._id} />
            <div className={'text-xl mb-3 text-left'}>{userDetails[0].build}</div>

            <div className={'form-values flex-1'}>
              <div className={'flex flex-col items-start mb-5'}>
                <span className={'text-md mb-2'}>Change Time</span>

                <Button
                  inverted
                  name={'updatedAt'}
                  color='green'
                  size={'small'}
                  circular
                  type={'button'}
                  active={!!form.formFieldState.get('updatedAt')}
                  onClick={() => {
                    form.patchValues('updatedAt', form.formFieldState.get('updatedAt') ?? dayjs().subtract(1, 'h').toDate());
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
                    color='green'
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
                    color='red'
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
                <span className={'text-md mb-2'}>Set Two Factor Auth</span>
                <div className={'w-full'}>
                  <div className={'mt-1 mb-2'}>{userDetails[0].data.userSession?.TWO_FACTOR_AUTH}</div>

                  <Input
                    className={'w-full'}
                    placeholder='Two factor auth'>
                    <input
                      key={userDetails[0].data.userSession?.TWO_FACTOR_AUTH}
                      name={'data.userSession.TWO_FACTOR_AUTH'}
                      defaultValue={userDetails[0].data.userSession?.TWO_FACTOR_AUTH}
                    />
                  </Input>
                </div>
              </div>
            </div>
            <hr className={'mt-2 mb-6'} />
            <Input
              className={'w-full mb-2'}
              placeholder='Password'>
              <input name={'password'} />
            </Input>
            <Button
              loading={form.loading}
              className={'w-full !bg-violet-500 !text-white'}
              type='submit'>Update</Button>
          </Form>
          <div className={'flex items-center h-[110px]'}>
            <Message
              hidden={!form.error}
              className={'text-left w-full'}
              negative>
              <MessageHeader>Error</MessageHeader>
              <p>{form.error}</p>
            </Message>
          </div>

        </div>
      </Dimmer>
    </div>
  );
};
UserSettingsComponent.displayName = 'UserSettings';
export default UserSettingsComponent;
