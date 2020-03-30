<template>
    <div class="login-form">
        <b-container>
            <b-row>
                <b-col md="4" offset-md="4">
                    <img class="login-form__logo" src="@/static/fw-logo.png" alt="Logo" title="">

                    <form @submit.prevent="onSubmit">
                        <h1 class="login-form__title">{{title}}</h1>

                        <span v-if="loginErrorMsg" class="login-form__msg">{{loginErrorMsg}}</span>

                        <PartInput v-model="user" placeholder="Email"/>
                        <PartInput v-model="pass" placeholder="Password" type="password"/>

                        <PartLoadingButton class="login-form__submit" type="submit" :preloader="loginLoading">
                            <span>Log In</span>
                        </PartLoadingButton>
                    </form>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
	import PartInput from '../parts/PartInput';
	import PartLoadingButton from '../parts/PartLoadingButton';

	export default {
		components: {
			PartInput,
			PartLoadingButton
		},

		data() {
			return {
				title: 'Login to Internal Platform',
				user: '',
				pass: ''
			};
		},

		computed: {
			loginLoading() {
				return this.$store.getters.loginLoading;
			},
			loginErrorMsg() {
				return this.$store.getters.loginErrorMsg;
			}
		},

		methods: {
			onSubmit() {
				this.$store.dispatch('setLoginLoading', true);
				this.$store.dispatch('setToken', {
					context: this,
					username: this.user,
					password: this.pass
				});
			}
		},

		beforeMount() {
			this.$store.dispatch('setLoginLoading', false);
		}
	};
</script>

<style lang="scss" scoped>
    .login-form {
        padding: 70px 0 0;
    }

    form {
        padding: 40px;
        background-color: rgba($white, .5);
        border-radius: 5px;
    }

    .login-form__title {
        font-size: 14px;
        margin-bottom: 15px;
        text-align: center;
    }

    .login-form__logo {
        width: 100%;
        margin: 0 auto 30px;
        max-width: 200px;
    }

    .login-form__msg {
        display: block;
        font-size: 10px;
        text-transform: uppercase;
        line-height: 1;
        letter-spacing: 1px;
        color: $red;
        text-align: center;
        margin-bottom: 10px;
        border-radius: 3px;
    }

    .login-form__submit {
        margin: 40px auto 0;
    }
</style>
