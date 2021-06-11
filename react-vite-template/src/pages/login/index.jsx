import { _CC_USER, _CC_GLOBAL } from '@constant';
import { Link } from 'react-router-dom';
import { useKeyPress } from 'ahooks';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, QuestionCircleOutlined, UserAddOutlined } from '@ant-design/icons';
import { useI18nKeyToText, MODEL_NAME } from 'cxy-react-i18n';
import { httpLogin } from '@http';
import { WavesBall, Language } from '@components';
import css from './login.module.less';

const layout = {
	wrapperCol: { span: 24 },
};

function setup(ctx) {
	ctx.initState({
		loading: false,
	});

	const st = {
		loadingChange: ctx.syncBool('loading'),
		// 提交表单验证成功
		onFinish: async (values) => {
			st.loadingChange();
			await httpLogin(values);
			st.loadingChange();
		},
	};

	return st;
}

function LoginView() {
	const [form] = Form.useForm();

	const ctx = useConcent({ module: _CC_USER, connect: [_CC_GLOBAL, MODEL_NAME], setup });

	const { state, moduleState: ms, settings: st, globalState: gs } = ctx;

	useKeyPress('enter', form.submit);
	// 国际化
	const username_placeholder = useI18nKeyToText('login.username.placeholder');
	const password_placeholder = useI18nKeyToText('login.password.placeholder');

	return (
		<>
			<Row className={css.login_box}>
				<Col xs={20} sm={14} md={12} lg={10} xl={8} xxl={6}>
					<div className={css.title}>{gs.title}</div>
					<div className={css.formBox}>
						{/* 边框 */}
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<Form {...layout} name='loginForm' form={form} initialValues={{ remember: false }} onFinish={st.onFinish}>
							<Form.Item name='userName' rules={[{ required: true, message: fr('login.username.required.message') }]}>
								<Input
									prefix={<UserOutlined style={{ color: '#1890ff' }} />}
									placeholder={username_placeholder}
									disabled={state.loading}
								/>
							</Form.Item>
							<Form.Item name='passWord' rules={[{ required: true, message: fr('login.password.required.message') }]}>
								<Input
									prefix={<LockOutlined style={{ color: '#1890ff' }} />}
									type='password'
									placeholder={password_placeholder}
									disabled={state.loading}
								/>
							</Form.Item>
							<Form.Item name='remember' valuePropName='checked'>
								<Checkbox>{fr('login.remember.label')}</Checkbox>
							</Form.Item>

							<Form.Item>
								<Button loading={state.loading} type='primary' htmlType='submit' block>
									{fr(
										ms.isLogin
											? 'login.submit.text.success'
											: state.loading
											? 'login.submit.text.loading'
											: 'login.submit.text',
									)}
								</Button>
							</Form.Item>
							<div className={css.flexsb}>
								<Link to='/'>
									<QuestionCircleOutlined style={{ marginRight: 5 }} />
									{fr('login.password.forget.text')}
								</Link>
								<Link to='/'>
									<UserAddOutlined style={{ marginRight: 5 }} />
									{fr('login.username.forget.text')}
								</Link>
							</div>
						</Form>
					</div>
				</Col>
			</Row>
			{/* 语言切换 */}
			<div className={css.languageCom}>
				<Language />
			</div>
			{/* 背景 */}
			<WavesBall />
		</>
	);
}

export default LoginView;
