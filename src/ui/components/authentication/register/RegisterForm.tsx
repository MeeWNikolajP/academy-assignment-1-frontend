import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { IonButton, IonIcon, IonInput, IonItem, IonText, useIonRouter, useIonLoading, useIonAlert } from '@ionic/react';
import { supabase } from 'apis/supabaseClient';
import { at, calendar, chevronBackCircle, eyeOffOutline, eyeOutline, lockClosedOutline, phonePortrait } from 'ionicons/icons';
import SocialLoginButton from '../social-login-buttons/SocialLoginButton';
import Separator from 'ui/components/generic/Separator';
import { useAuthUserStore } from 'store/user';
import { Provider } from '@supabase/supabase-js';
import { t } from 'i18next';

type RegisterFormProps = {
  togglePasswordButtonType?: 'text' | 'icon' | 'none';
};

const RegisterForm: React.FC<RegisterFormProps> = ({ togglePasswordButtonType = 'icon' }) => {
  const router = useIonRouter();
  const history = useHistory();
  const setAuthUser = useAuthUserStore((state) => state.setAuthUser);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatedPassword, setRepeatedPassword] = useState<string>('');
  const [fullname, setFullname] = useState<string>('');
  const [phonenumber, setPhonenumber] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('dd/mm/yyyy');
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const [repeatedPasswordShown, setRepeatedPasswordShown] = useState<boolean>(false);
  const [present, dismiss] = useIonLoading();
  const [presentAlert] = useIonAlert();
  const [emailValid, setEmailValid] = useState<boolean>(true);
  const [passwordValid, setPasswordValid] = useState<boolean>(true);
  const [repPasswordValid, setRepPasswordValid] = useState<boolean>(true);
  const [nameValid, setNameValid] = useState<boolean>(true);
  const [phoneValid, setPhoneValid] = useState<boolean>(true);
  const [birthdayValid, setBirthdayValid] = useState<boolean>(true);

  useEffect(() => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailCheck = emailRegex.test(email) && email !== '';
    const passwordCheck = password.length >= 8 && password !== '';
    const repPasswordCheck = password === repeatedPassword && repeatedPassword !== '';
    //does not accept single quotes in fullname
    const nameRegex =
      /^(?![×÷])[A-Za-zÀ-ÿ]+ (?![×÷])[A-Za-zÀ-ÿ]+$/;
    const nameCheck = nameRegex.test(fullname);
    const phoneRegex =
      /^(?:(?:00|\+)?45)?(?=2|3[01]|4[012]|4911|5[0-3]|6[01]|[78]1|9[123])\d{8}$/;
    /* setPhonenumber(phonenumber.replace(/\s/g, ")); */
    const phoneCheck = phoneRegex.test(phonenumber);

    const todaysDate = new Date();
    const today = new Date(
      todaysDate.getFullYear()-18,
      todaysDate.getMonth(),
      todaysDate.getDay()
    );
    const birthdayCheck = today > new Date(birthday);

    setEmailValid(emailCheck || email === '');
    setPasswordValid(passwordCheck || password === '');
    setRepPasswordValid(repPasswordCheck || repeatedPassword === '');
    setNameValid(nameCheck || fullname === '');
    setPhoneValid(phoneCheck || phonenumber === '');
    setBirthdayValid(birthdayCheck || birthday === 'dd/mm/yyyy');

    setIsDisabled(!emailCheck || !passwordCheck || !repPasswordCheck || !nameCheck || !phoneCheck || !birthdayCheck);
  }, [email, password, repeatedPassword, fullname, phonenumber, birthday]);

  const handleSignUp = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (password !== repeatedPassword) {
      return await presentAlert({ header: t('authentication.signUpFailed'), message: t('authentication.passwordMustMatch'), buttons: ['OK'] });
    }
    let tempPhone = phonenumber;
    if (!phonenumber.includes('+45' || '0045')) {
      tempPhone = '+45' + tempPhone;
    }
    await present({ message: t('authentication.creatingUser') });
    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: {
          email,
          fullname,
          phonenumber: tempPhone,
          birthday,
        }
      } });
    if (data.user) {
      console.log(data.user);
      setAuthUser(data.user);
      await dismiss();
      await presentAlert({ header: t('authentication.signUpSuccessful'), buttons: ['OK'] });
      router.push('/intro');
    } else {
      await dismiss();
      await presentAlert({ header: t('authentication.signUpFailed'), message: error?.message, buttons: ['OK'] });
    }
  };

  const signUpWithThirdParty = async (variant: Provider) => {
    await present({ message: t('authentication.redirecting') });
    const { error } = await supabase.auth.signInWithOAuth({
      provider: variant,
    });
    if (error) return await presentAlert({ header: t('authentication.genericError'), message: error?.message, buttons: ['OK'] });
    await dismiss();
  };

  const togglePasswordButton = (isRepeatedPassword: boolean) => {
    if (togglePasswordButtonType === 'text') {
      if (isRepeatedPassword) {
        return (
          <div className="mr-1 text-sm font-bold cursor-pointer text-primary-brand" onClick={() => setRepeatedPasswordShown(!repeatedPasswordShown)}>
            {repeatedPasswordShown ? <IonText>{t('authentication.hide')}</IonText> : <IonText>{t('authentication.show')}</IonText>}
          </div>
        );
      } else {
        return (
          <div className="mr-1 text-sm font-bold cursor-pointer text-primary-brand" onClick={() => setPasswordShown(!passwordShown)}>
            {passwordShown ? <IonText>{t('authentication.hide')}</IonText> : <IonText>{t('authentication.show')}</IonText>}
          </div>
        );
      }
    }
    if (togglePasswordButtonType === 'icon') {
      if (isRepeatedPassword) {
        return (
          <IonIcon
            className="text-primary-brand"
            icon={repeatedPasswordShown ? eyeOutline : eyeOffOutline}
            size="medium"
            onClick={() => setRepeatedPasswordShown(!repeatedPasswordShown)}
          />
        );
      } else {
        return (
          <IonIcon
            className="text-primary-brand"
            icon={passwordShown ? eyeOutline : eyeOffOutline}
            size="medium"
            onClick={() => setPasswordShown(!passwordShown)}
          />
        );
      }
    }
  };

  return (
    <div className="flex h-full justify-center items-center w-full">
      <form className="sm:w-[400px] w-3/4 relative" onSubmit={handleSignUp}>
        <div className="flex items-center">
          <IonIcon onClick={() => history.goBack()} icon={chevronBackCircle} size={'large'} color={'primary-brand'} className="pr-2 cursor-pointer" />
          <IonText className="text-primary-brand text-xl font-extrabold">{t('authentication.signUp')}</IonText>
        </div>
        <IonItem lines="none" color={'white-background'} className={`border ${emailValid ? 'border-grey-text' : 'border-red-300'} mt-8`}>
          <IonInput value={email} placeholder={t('authentication.email')} onIonChange={(e) => setEmail(e.detail.value ?? '')} type="email" required class="h-[59px] items-center" />
          <IonIcon icon={at} size="medium" className="text-primary-brand" />
        </IonItem>

        <IonText className={`text-red-500 ${emailValid && 'opacity-0'}`}>{t('authentication.emailInvalid')}</IonText>

        <IonItem lines="none" color={'white-background'} className={`border ${passwordValid ? 'border-grey-text' : 'border-red-300'}`}>
          <IonInput
            value={password}
            placeholder={t('authentication.password')}
            onIonChange={(e) => setPassword(e.detail.value ?? '')}
            type={passwordShown ? 'text' : 'password'}
            required
            class="h-[59px] items-center"
          />
          {password !== '' && togglePasswordButton(false)}
          {password === '' && (
            <IonIcon icon={lockClosedOutline} size="medium" className="text-primary-brand" />
          )}
        </IonItem>

        <IonText className={`text-red-500 ${passwordValid && 'opacity-0'}`}>{t('authentication.passwordMinLength')}</IonText>

        <IonItem lines="none" color={'white-background'} className={`border ${repPasswordValid ? 'border-grey-text' : 'border-red-300'}`}>
          <IonInput
            value={repeatedPassword}
            placeholder={t('authentication.repeatPassword')}
            onIonChange={(e) => setRepeatedPassword(e.detail.value ?? '')}
            type={repeatedPasswordShown ? 'text' : 'password'}
            required
            class="h-[59px] items-center"
          />
          {repeatedPassword !== '' && togglePasswordButton(true)}
          {repeatedPassword === '' && (
            <IonIcon icon={lockClosedOutline} size="medium" className="text-primary-brand" />
          )}
        </IonItem>

        <IonText className={`text-red-500 ${repPasswordValid && 'opacity-0'}`}>{t('authentication.passwordMustMatch')}</IonText>
        
        <IonItem lines="none" color={'white-background'} className={`border ${nameValid ? 'border-grey-text' : 'border-red-300'}`}>
          <IonInput value={fullname} placeholder={t('authentication.fullname')} onIonChange={(e) => setFullname(e.detail.value ?? '')} type="text" required class="h-[59px] items-center" />
        </IonItem>

        <IonText className={`text-red-500 ${nameValid && 'opacity-0'}`}>{t('authentication.nameMustBeFullName')}</IonText>

        <IonItem lines="none" color={'white-background'} className={`border ${phoneValid ? 'border-grey-text' : 'border-red-300'}`}>
          <IonInput value={ phonenumber } placeholder={t('authentication.phonenumber')} onIonChange={(e) => setPhonenumber(e.detail.value ?? '')} type="tel" required class="h-[59px] items-center" />
          <IonIcon icon={phonePortrait} size="medium" className="text-primary-brand" />
        </IonItem>

        <IonText className={`text-red-500 ${phoneValid && 'opacity-0'}`}>{t('authentication.phone8NumbersNoSpaces')}</IonText>

        <IonItem lines="none" color={'white-background'} className={`border ${birthdayValid ? 'border-grey-text' : 'border-red-300'}`}>
          <IonInput id="myDate" placeholder="HTML Placeholder" onIonChange={(e) => setBirthday(e.detail.value ?? '')} type='date' required class="h-[59px] items-center" />
          <IonIcon icon={calendar} size="medium" className="text-primary-brand" />
        </IonItem>

        <IonText className={`${birthdayValid ? 'text-gray-500' : 'text-red-500'}`}>{birthdayValid ? t('authentication.enterBirthday') : t('authentication.birthdayAgeNotValid')}</IonText>

        <IonButton expand="full" className="w-full mb-2" onClick={handleSignUp} disabled={isDisabled}>
          {t('authentication.signUp')}
        </IonButton>
        <button className="hidden" type="submit" />

        <Separator text={t('authentication.or')} />

        <div className="flex justify-between gap-2">
          <SocialLoginButton provider="facebook" onClick={() => signUpWithThirdParty('facebook')} />
          <SocialLoginButton provider="google" onClick={() => signUpWithThirdParty('google')} />
          <SocialLoginButton provider="apple" onClick={() => signUpWithThirdParty('apple')} />
        </div>
      </form>
    </div>
  );
};
export default RegisterForm;
