<template>
  <!-- need b-row tag for precedence tag-->
  <b-col
    class="register mt-3 mb-3"
    xl="6"
    offset-xl="3"
    lg="8"
    offset-lg="2"
    md="10"
    offset-md="1"
    cols="12"
  >
    <div
      class="register__title"
    >
      <h1>{{ message }}</h1>
    </div>

    <b-form-row
      class="register__row"
    >
      <b-col
        cols="8"
        offset="2"
        md="6"
        offset-md="3"
      >
        <google-button></google-button>
      </b-col>
    </b-form-row>
    <b-form-row
      class="register__row"
    >
      <b-col cols="5">
        <hr/>
      </b-col>
      <b-col cols="2">
        OR
      </b-col>
      <b-col cols="5">
        <hr/>
      </b-col>
    </b-form-row>

    <div class="register__main">
      <b-form-row>
        <b-col cols="12">
          <b-form-group
            description="This is for your ID. We don't send to your email because we can't send."
            label="Email Address"
            label-for="id"
            :state="validState('id')"
            valid-feedback="Good!"
            :invalid-feedback="invalidFeedback('id')"
            @input="resetIDCheckState"
          >
            <b-input-group>
              <b-input
                id="id"
                v-model="registerData.id"
                placeholder="pedogunu@gmail.com"
                ref="id"
                :state="validState('id')"
              />

              <b-input-group-append>
                <b-button
                  size="sm"
                  variant="outline-secondary"
                  ref="idCheck"
                  @click="idCheck(registerData.id)"
                >
                  Check overlap
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-form-row>
        <b-col cols="6">
          <b-form-group
            description="8 or more letters, number and symbols"
            label="Password"
            label-for="password"
            :state="validState('password')"
            valid-feedback="Cool!"
            :invalid-feedback="invalidFeedback('password')"
          >
            <b-input
              type="password"
              id="password"
              ref="password"
              placeholder="Password"
              v-model="registerData.password"
              :state="validState('password')"
            />
          </b-form-group>
        </b-col>

        <b-col cols="6">
          <b-form-group
            label="Confirm Password"
            label-for="passwordConfirm"
            :state="validState('passwordConfirm')"
            valid-feedback="Password Matched"
            :invalid-feedback="invalidFeedback('passwordConfirm')"
          >
            <b-input
              type="password"
              id="passwordConfirm"
              ref="passwordConfirm"
              placeholder="Repeat Password"
              v-model="registerData.passwordConfirm"
              :state="validState('passwordConfirm')"
            />
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-form-row>
        <b-col cols="5">
          <b-form-group
            label="Last name"
            label-for="lastName"
            :state="validState('lastName')"
            valid-feedback="Good!"
            :invalid-feedback="invalidFeedback('lastName')"
          >
            <b-input
              type="text"
              id="lastName"
              ref="lastName"
              placeholder="Last name"
              v-model="registerData.lastName"
              :state="validState('lastName')"
            />
          </b-form-group>
        </b-col>

        <b-col cols="5">
          <b-form-group
            label="First name"
            label-for="firstName"
            :state="validState('firstName')"
            valid-feedback="Look good!"
            :invalid-feedback="invalidFeedback('firstName')"
          >
            <b-input
              type="text"
              id="firstName"
              ref="firstName"
              placeholder="First name"
              v-model="registerData.firstName"
              :state="validState('firstName')"
            />
          </b-form-group>
        </b-col>

        <b-col cols="2">
          <b-form-group
            label="Gender"
            label-for="gender"
            ref="gender"
            :state="validState('gender')"
            valid-feedback="Good!"
            :invalid-feedback="invalidFeedback('gender')"
          >
            <b-form-select
              id="gender"
              :options="genderData"
              v-model="registerData.gender"
              :state="validState('gender')"
            >
              <template #first>
                <option
                  :value="null"
                  disabled
                  hidden
                >
                  Choose
                </option>
              </template>
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col
          cols="12"
          md="5"
        >
          <b-form-group
            description="This is optional."
            label="Phone number"
            label-for="phoneNumber"
          >
            <b-input-group
              prepend="+82"
            >
              <b-input
                id="phoneNumber"
                placeholder="Your Phone number"
                v-model="registerData.phoneNumber"
              />
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col
          cols="6"
          md="4"
        >
          <b-form-group
            description="This is optional."
            label="Student ID"
            label-for="studentId"
          >
            <b-input
              id="studentId"
              placeholder="ex)2019136077"
              v-model="registerData.studentId"
            />
          </b-form-group>
        </b-col>

        <b-col
          cols="6"
          md="3"
        >
          <b-form-group
            label="Main Major"
            label-for="mainMajor"
          >
            <b-input
              id="mainMajor"
              readonly
              v-model="mainMajor"
            >
            </b-input>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-form-row>
        <b-form-group
          class="mx-auto"
          :state="validState('termCheck')"
          :invalid-feedback="invalidFeedback('termCheck')"
        >
          <b-form-checkbox
            v-model="registerData.termCheck"
            id="termCheck"
            ref="termCheck"
            :state="validState('termCheck')"
          >
            Agree Term of Services and Conditions
          </b-form-checkbox>
        </b-form-group>
      </b-form-row>

      <b-form-row>
        <b-col
          cols="4"
          offset="2"
          md="3"
          offset-md="3"
        >
          <b-button
            class="register__button"
            variant="primary"
            @click="submitData"
          >
            Sign in
          </b-button>
        </b-col>
        <b-col
          cols="4"
          md="3"
        >
          <b-button
            class="register__button"
            variant="secondary"
            to="/"
          >
            Cancel
          </b-button>
        </b-col>
      </b-form-row>
    </div>
  </b-col>
</template>

<script>
  import { mapActions } from 'vuex'
  import googleButton from './GoogleButton'

  const emailRegex = /^[a-zA-Z0-9]*@[a-zA-Z0-9]*\.([a-zA-Z0-9]*\.[a-zA-Z0-9]*|[a-zA-Z0-9]*)$/
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/

  export default {
    name: "register",
    data() {
      return {
        registerData: {
          id: '',
          password: '',
          passwordConfirm: '',
          lastName: '',
          firstName: '',
          gender: null,
          phoneNumber: '',
          studentId: '',
          termCheck: false
        },
        genderData: [
          {text: 'M', value: 'male'},
          {text: 'F', value: 'female'}
        ],
        idCheckState: 'not checked',
        hasSubmitted: false
      }
    },
    props: {
      message: {
        type: String,
        default: 'Register'
      }
    },
    methods: {
      idCheck() {
        emailRegex.test(this.registerData.id) ?
            this.idChecking(this.registerData.id) ?
              this.idCheckState = 'not overlap' :
              this.idCheckState = 'overlap'
          :
          alert('fill ID field with Email form')
      },
      resetIDCheckState() {
        this.idCheckState = 'not checked'
      },
      submitData() {
        //This is for check validState function to check state
        const requiredData = ['id', 'password', 'passwordConfirm', 'lastName',
          'firstName', 'gender']
        this.hasSubmitted = true


        for(let i = 0; i < requiredData.length; i++) {
          if (!this.validState(requiredData[i])) {
            if (this.invalidFeedback(requiredData[i]) === 'This field is required')
              alert('Fill all field')
            else
              alert(this.invalidFeedback(requiredData[i]))
            this.$refs[requiredData[i]].focus()
            return
          }
        }
        const registerData = {
          id: this.registerData.id,
          password: this.registerData.password,
          lastName: this.registerData.lastName,
          firstName: this.registerData.firstName,
          fullName: this.registerData.firstName +
            ' ' +
            this.registerData.lastName,
          gender: this.registerData.gender,
          phoneNumber: this.registerData.phoneNumber,
          studentId: this.registerData.studentId,
          type: 'original'
        }

        this.makeAccount(registerData) ?
          this.$router.push('/login') :
          {}
      },
      validState(field) {
        if(!this.hasSubmitted)
          return null

        switch(field) {
          case 'id':
            return emailRegex.test(this.registerData.id) &&
              this.idCheckState === 'not overlap'
          case 'password':
            return passwordRegex.test(this.registerData.password)
          case 'passwordConfirm': return !!this.registerData.password &&
            this.registerData.password === this.registerData.passwordConfirm
          default:
            return !!this.registerData[field]
        }
      },
      invalidFeedback(field) {
        switch (field) {
          case 'id':
            if (!this.registerData.id)
              return 'This field is required'
            else if (!emailRegex.test(this.registerData.id))
              return 'Keep Email form'
            else {
              if (this.idCheckState === 'not checked')
                return 'Check id overlap'
              else
                return 'Use other Email address'
            }
          // eslint-disable-next-line no-fallthrough
          case 'password':
            if (!this.registerData.password)
              return 'This field is required'
            else
              return 'Keep this form'
          case 'passwordConfirm':
            if (this.registerData.password)
              return 'Password is not matched'
            else
              return 'This field is required'
          case 'gender':
            return 'Choose one in dropdown'
          default:
            return 'This field is required'
        }
      },
      ...mapActions(
        'account',
        {
          idChecking: 'idCheck',
          makeAccount: 'makeAccount'
        }
      )
    },
    computed: {
      mainMajor() {
        if(this.registerData.studentId.length !== 10)
          return ''
        else {
          let standard_id = /\d{4}(\d{3})\d{3}/
          let majornum = standard_id
            .exec(this.registerData.studentId)[1];

          switch (majornum) {
            case '120':
              return '기계공학부'
            case '136':
              return '컴퓨터공학부'
            case '140':
              return '메카트로닉스학부'
            case '151':
              return '디자인건축공학부'
            case '161':
              return '전기전자통신공학부'
            case '174':
              return '에너지신소재화학공학부'
            case '180':
              return '산업경영학부'
            default:
              return ''
          }
        }
      }
    },
    components: {
      googleButton
    }
  }
</script>

<style scoped>

  .register {
    padding: 30px;
  }
  @media (min-width: 768px) {
    .register {
      border: 1px dimgray solid;
      padding: 10px;
    }
  }
  
  .register__title {
    margin: 3%;
    text-align: center;
  }
  .register__row {
    margin-top: 10px;
    text-align: center;
  }
  .register__button {
    width: 100%;
    height: 100%;
  }

  .register__main {
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 10px;
    margin-right: 10px;
  }
</style>