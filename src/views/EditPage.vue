<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>

        <ion-title>
          {{ id ? "Editar currículo" : "Adicionar currículo" }}
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="flex flex-col" :fullscreen="true">
      <ion-header class="flex-0" collapse="condense">
        <ion-toolbar>
          <ion-title>
            {{ id ? "Editar currículo" : "Adicionar currículo" }}
          </ion-title>
        </ion-toolbar>
      </ion-header>

      <div
        id="container"
        class="flex-0 relative container mx-auto p-6"
      >
        <Form
          ref="form"
          v-slot="{ meta, validateField }"
          :validation-schema
          @submit="onSubmit"
        >
          <ion-card class="mb-6">
            <ion-card-content>
              <div class="grid gap-2">
                <ion-label position="stacked">Imagem</ion-label>

                <Field :name="`imagem`" v-slot="{ field }">
                  <div
                    v-if="field.value"
                    class="relative w-full md:w-[50%] lg:w-[20%] mx-auto aspect-square"
                  >
                    <ion-img
                      :src="field.value"
                      class="aspect-square object-cover hover:object-contain"
                    />

                    <ion-button
                      color="danger"
                      shape="round"
                      class="w-10 absolute right-0 top-0 mx-auto aspect-square"
                      @click="isRemoveImageAlertOpen = true"
                    >
                      <ion-icon slot="icon-only" name="trash"></ion-icon>
                    </ion-button>

                    <ion-button
                      color="primary"
                      shape="round"
                      class="w-10 absolute right-0 bottom-0 mx-auto aspect-square"
                      @click="addImagem"
                    >
                      <ion-icon slot="icon-only" name="reload"></ion-icon>
                    </ion-button>

                    <ion-alert
                      :is-open="isRemoveImageAlertOpen"
                      header="Remover Imagem"
                      message="Deseja realmente remover esta imagem?"
                      :buttons="removeImageAlertButtons"
                      @didDismiss="isRemoveImageAlertOpen = false"
                    />
                  </div>

                  <ion-button
                    v-else
                    color="primary"
                    expand="full"
                    class="w-full md:w-[50%] lg:w-[20%] mx-auto aspect-square"
                    @click="addImagem"
                  >
                    <ion-icon name="add"></ion-icon>
                  </ion-button>
                </Field>
              </div>
            </ion-card-content>
          </ion-card>

          <ion-card class="mb-6">
            <ion-card-content>
              <div class="grid gap-2">
                <ion-label position="stacked">Nome *</ion-label>

                <ion-item>
                  <Field
                    name="nome.text"
                    v-slot="{ field, meta, errorMessage }"
                  >
                    <ion-input
                      v-bind="field"
                      placeholder="Seu Nome"
                      :class='
                        !meta.valid
                        ? "ion-touched ion-invalid"
                        : ""
                      '
                      :errorText="errorMessage"
                      @ionInput='
                        () =>
                        adjustFont(
                          "nome",
                          100,
                          "Ruda-Black",
                        )
                      '
                    ></ion-input>
                  </Field>
                </ion-item>

                <ion-label position="stacked">Sobrenome *</ion-label>

                <ion-item>
                  <Field
                    name="sobrenome.text"
                    v-slot="{ field, meta, errorMessage }"
                  >
                    <ion-input
                      v-bind="field"
                      placeholder="Seu Sobrenome"
                      :class='
                        !meta.valid
                        ? "ion-touched ion-invalid"
                        : ""
                      '
                      :errorText="errorMessage"
                      @ionInput='
                        () =>
                        adjustFont(
                          "sobrenome",
                          100,
                          "Ruda-Black",
                        )
                      '
                    ></ion-input>
                  </Field>
                </ion-item>
              </div>
            </ion-card-content>
          </ion-card>

          <ion-card class="mb-6">
            <ion-card-content>
              <div class="grid gap-2">
                <ion-label position="stacked">Sobre Mim *</ion-label>

                <ion-item>
                  <Field
                    name="sobre.text"
                    v-slot="
                      {
                        field,
                        meta,
                        setValue,
                        errorMessage,
                      }
                    "
                  >
                    <ion-textarea
                      :value='field.value!.join("\n")'
                      placeholder="Sobre..."
                      :class='
                        !meta.valid
                        ? "ion-touched ion-invalid"
                        : ""
                      '
                      :errorText="errorMessage"
                      @ionInput='
                        (event) => {
                          setValue(event
                            .target.value!
                            .split("\n"));

                          adjustFontMultiline(
                            "sobre",
                            110,
                            30,
                          );
                        }
                      '
                    ></ion-textarea>
                  </Field>
                </ion-item>
              </div>
            </ion-card-content>
          </ion-card>

          <ion-card class="mb-6">
            <ion-card-content>
              <div class="grid gap-2">
                <ion-label position="stacked">Contato *</ion-label>

                <FieldArray
                  ref="contato-field-array"
                  name="contato"
                  v-slot="{ fields, push, remove }"
                >
                  <ion-item
                    v-for="(field, index) in fields"
                    :key="field.key"
                  >
                    <ion-grid>
                      <ion-row>
                        <ion-col size="12" size-md="4">
                          <Field
                            :name="`contato[${index}].icone`"
                            v-slot="
                              {
                                field,
                                meta,
                                errorMessage,
                                handleChange,
                              }
                            "
                          >
                            <ion-select
                              placeholder="Ícone *"
                              interface="popover"
                              :class='
                                !meta.valid &&
                                  meta.touched
                                ? "ion-touched ion-invalid"
                                : ""
                              '
                              :modelValue="field.value"
                              :compareWith="contatoIconeCompare"
                              :errorText="errorMessage"
                              @ionChange="handleChange"
                            >
                              <ion-select-option
                                :value='
                                  {
                                    d: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 4l-8 5l-8-5V6l8 5l8-5z",
                                    size: 0.3,
                                  }
                                '
                              >Mail</ion-select-option>

                              <ion-select-option
                                :value='
                                  {
                                    d: "M13.95 4.24C11.86 1 7.58.04 4.27 2.05C1.04 4.06 0 8.44 2.09 11.67l.17.26l-.7 2.62l2.62-.7l.26.17c1.13.61 2.36.96 3.58.96c1.31 0 2.62-.35 3.75-1.05c3.23-2.1 4.19-6.39 2.18-9.71Zm-1.83 6.74c-.35.52-.79.87-1.4.96c-.35 0-.79.17-2.53-.52c-1.48-.7-2.71-1.84-3.58-3.15c-.52-.61-.79-1.4-.87-2.19c0-.7.26-1.31.7-1.75c.17-.17.35-.26.52-.26h.44c.17 0 .35 0 .44.35c.17.44.61 1.49.61 1.58c.09.09.05.76-.35 1.14c-.22.25-.26.26-.17.44c.35.52.79 1.05 1.22 1.49c.52.44 1.05.79 1.66 1.05c.17.09.35.09.44-.09c.09-.17.52-.61.7-.79c.17-.17.26-.17.44-.09l1.4.7c.17.09.35.17.44.26c.09.26.09.61-.09.87Z",
                                    size: 0.45,
                                  }
                                '
                              >Whatsapp</ion-select-option>

                              <ion-select-option
                                :value='
                                  {
                                    d: "M19.95 21q-3.125 0-6.175-1.362t-5.55-3.863t-3.862-5.55T3 4.05q0-.45.3-.75t.75-.3H8.1q.35 0 .625.238t.325.562l.65 3.5q.05.4-.025.675T9.4 8.45L6.975 10.9q.5.925 1.187 1.787t1.513 1.663q.775.775 1.625 1.438T13.1 17l2.35-2.35q.225-.225.588-.337t.712-.063l3.45.7q.35.1.575.363T21 15.9v4.05q0 .45-.3.75t-.75.3",
                                    size: 0.3,
                                  }
                                '
                              >Phone</ion-select-option>

                              <ion-select-option
                                :value='
                                  {
                                    d: "M10 20h4v-1h-4zm-3 3q-.825 0-1.412-.587T5 21V3q0-.825.588-1.412T7 1h10q.825 0 1.413.588T19 3v18q0 .825-.587 1.413T17 23zm0-7h10V6H7z",
                                    size: 0.3,
                                  }
                                '
                              >Cel</ion-select-option>

                              <ion-select-option
                                :value='
                                  {
                                    d: "M 11.999702 2.7632921 C 6.8982439 2.7632921 2.7634006 6.898139 2.7634006 11.999593 C 2.7634006 17.101047 6.8982439 21.237617 11.999702 21.237617 C 17.10116 21.237617 21.237725 17.101047 21.237725 11.999593 C 21.237725 6.898139 17.10116 2.7632921 11.999702 2.7632921 z M 11.526001 3.8037109 L 11.526001 8.2134332 C 10.300364 8.2320358 9.0787737 8.3506091 7.8724772 8.568278 C 8.1144772 7.626278 8.4514971 6.7813063 8.8594971 6.0723063 C 9.6074971 4.7753063 10.548001 3.9947109 11.526001 3.8037109 z M 12.473402 3.8054335 C 13.451402 3.9954335 14.391906 4.7743063 15.139906 6.0723063 C 15.548906 6.7823063 15.885649 7.626278 16.128649 8.568278 C 14.921996 8.3508902 13.699346 8.2333738 12.473402 8.2151557 L 12.473402 3.8054335 z M 9.0093587 4.2653537 C 8.6369154 4.6727537 8.3107085 5.1205282 8.0378418 5.6003282 C 7.5158418 6.5053282 7.1081162 7.5904867 6.8441162 8.7904867 C 6.4287829 8.8951533 6.0399514 9.011108 5.6779514 9.1384413 L 3.9605713 9.977322 C 4.6194046 7.368122 6.5007521 5.2395204 9.0093587 4.2653537 z M 14.990044 4.2653537 C 17.499661 5.2391871 19.381601 7.3690113 20.040554 9.9790446 C 19.575554 9.6560446 18.989452 9.3754413 18.321452 9.1384413 C 17.959452 9.0104413 17.57062 8.8944867 17.155287 8.7904867 C 16.891287 7.5904867 16.482839 6.5053282 15.959839 5.6003282 L 14.990044 4.2653537 z M 11.526001 9.162557 L 11.526001 14.362929 C 10.079001 14.335929 8.7343666 14.180292 7.5813666 13.932292 C 7.4973666 13.313292 7.4521756 12.666593 7.4521756 11.999593 C 7.4509422 11.187626 7.5191029 10.378124 7.6554362 9.577691 C 8.9298062 9.3200243 10.225934 9.1792236 11.526001 9.162557 z M 12.473402 9.162557 L 16.343967 9.577691 C 16.475967 10.342691 16.547228 11.154593 16.547228 11.999593 C 16.546561 12.667593 16.504426 13.312681 16.419759 13.934014 C 15.266759 14.181014 13.920402 14.337984 12.473402 14.364651 L 12.473402 9.162557 z M 6.6580811 9.8222928 C 6.4762193 11.102992 6.4553789 12.401817 6.5960693 13.68769 C 6.3860693 13.62569 6.1855669 13.561432 5.9949002 13.494765 C 5.2349002 13.225765 4.6543524 12.916317 4.2723524 12.597317 C 3.8873524 12.276317 3.7573107 11.993604 3.7573107 11.763604 C 3.7573107 11.533604 3.8873524 11.249168 4.2723524 10.928168 C 4.6543524 10.609168 5.2349002 10.300444 5.9949002 10.032444 C 6.2049002 9.9591103 6.4260811 9.8889595 6.6580811 9.8222928 z M 17.341322 9.8222928 C 17.573322 9.8889594 17.794503 9.9584436 18.004503 10.032444 C 18.764503 10.300444 19.345051 10.609168 19.727051 10.928168 C 20.112051 11.249168 20.242093 11.533604 20.242093 11.763604 C 20.242093 11.993604 20.112051 12.276317 19.727051 12.597317 C 19.345051 12.916317 18.764503 13.225765 18.004503 13.494765 C 17.813836 13.562098 17.613334 13.626357 17.403334 13.68769 L 17.494629 11.999593 C 17.494629 11.250593 17.441322 10.522293 17.341322 9.8222928 z M 3.8382704 13.462036 C 4.3212704 13.821036 4.9526739 14.130044 5.6796739 14.387044 C 6.0302439 14.509711 6.3844384 14.617161 6.7442084 14.709161 C 6.9982084 16.109161 7.4465643 17.368858 8.0395643 18.398858 L 9.0093587 19.733832 C 6.3098187 18.688066 4.3501504 16.311469 3.8382704 13.462036 z M 20.161133 13.462036 C 19.649253 16.311469 17.689584 18.688066 14.990044 19.733832 C 15.362488 19.326466 15.688695 18.878691 15.961561 18.398858 C 16.555561 17.368858 17.001195 16.109161 17.255195 14.709161 C 17.633861 14.611827 17.989452 14.504378 18.321452 14.387044 L 20.161133 13.462036 z M 16.245782 14.934814 C 16.001782 16.077814 15.618906 17.093157 15.139906 17.925157 C 14.391906 19.222157 13.451402 20.004475 12.473402 20.195475 L 12.473402 15.31033 C 13.738766 15.29174 15.00166 15.166445 16.245782 14.934814 z M 7.755344 14.936537 C 8.893344 15.155537 10.173001 15.287052 11.526001 15.312052 L 11.526001 20.197198 C 10.548328 20.006262 9.6073751 19.225822 8.8594971 17.928602 L 8.8594971 17.92688 C 8.3808474 17.095119 8.0002168 16.077944 7.755344 14.936537 z",
                                    size: 0.3,
                                  }
                                '
                              >WWW</ion-select-option>

                              <ion-select-option
                                :value='
                                  {
                                    d: "M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2",
                                    size: 0.3,
                                  }
                                '
                              >GitHub</ion-select-option>
                            </ion-select>
                          </Field>
                        </ion-col>

                        <ion-col size="10" size-lg="7">
                          <Field
                            :name="`contato[${index}].info.text`"
                            v-slot="
                              {
                                field,
                                meta,
                                errorMessage,
                              }
                            "
                          >
                            <ion-input
                              v-bind="field"
                              placeholder="Info Contato *"
                              :class='
                                !meta.valid
                                ? "ion-touched ion-invalid"
                                : ""
                              '
                              :errorText="errorMessage"
                              @ionInput="
                                () =>
                                adjustFont(
                                  `contato[${index}].info`,
                                  55,
                                )
                              "
                            ></ion-input>
                          </Field>
                        </ion-col>

                        <ion-col size="2" size-lg="1">
                          <ion-button
                            color="primary"
                            class="w-full h-full !flex items-center justify-center"
                            fill="clear"
                            @click='
                              remove(index);
                              validateField(
                                "contato",
                              );
                            '
                            v-if="index > 0"
                          >
                            <ion-icon slot="icon-only" name="close"></ion-icon>
                          </ion-button>
                        </ion-col>
                      </ion-row>
                    </ion-grid>
                  </ion-item>

                  <ion-button
                    color="primary"
                    expand="full"
                    @click="
                      push({
                        icone: {
                          d: meta.initialValues?.contato[0]
                            .icone
                            .d,
                          size: meta.initialValues?.contato[0]
                            .icone.size,
                        },
                        info: {
                          text: meta.initialValues?.contato[0]
                            .info.text,
                          fontSize: meta.initialValues
                            ?.contato[0]
                            .info.fontSize,
                        },
                      })
                    "
                  >Adicionar contato</ion-button>

                  <Field name="contato" as="div" v-slot="{ errorMessage }">
                    <p class="text-[#f24c58]">{{ errorMessage }}</p>
                  </Field>
                </FieldArray>
              </div>
            </ion-card-content>
          </ion-card>

          <ion-card class="mb-6">
            <ion-card-content>
              <div class="grid gap-2">
                <FieldArray
                  ref="experiencia-field-array"
                  name="experiencia"
                  v-slot="{ fields, push, remove }"
                >
                  <div
                    v-for="(field, index) in fields"
                    :key="field.key"
                    class="grid gap-2"
                  >
                    <ion-label position="stacked"
                    >Experiência {{
                        fields.length > 1
                        ? `#${index + 1}`
                        : ""
                      }}*</ion-label>

                    <ion-grid>
                      <ion-row>
                        <ion-col>
                          <ion-row>
                            <ion-col size="12">
                              <ion-item>
                                <Field
                                  :name="`experiencia[${index}].empresa.text`"
                                  v-slot="
                                    {
                                      field,
                                      meta,
                                      errorMessage,
                                    }
                                  "
                                >
                                  <ion-input
                                    v-bind="field"
                                    placeholder="Empresa *"
                                    :class='
                                      !meta
                                        .valid
                                      ? "ion-touched ion-invalid"
                                      : ""
                                    '
                                    :errorText="errorMessage"
                                    @ionInput='
                                      () =>
                                      adjustFont(
                                        `experiencia[${index}].empresa`,
                                        112,
                                        "Ruda",
                                      )
                                    '
                                  ></ion-input>
                                </Field>
                              </ion-item>
                            </ion-col>
                          </ion-row>

                          <ion-row>
                            <ion-col size="6">
                              <ion-item>
                                <Field
                                  :name="`experiencia[${index}].anoInicio`"
                                  v-slot="
                                    {
                                      field,
                                      setValue,
                                      meta,
                                      errorMessage,
                                    }
                                  "
                                >
                                  <ion-input
                                    v-bind="field"
                                    placeholder="Ano Início *"
                                    :class='
                                      !meta
                                        .valid
                                      ? "ion-touched ion-invalid"
                                      : ""
                                    '
                                    :errorText="errorMessage"
                                    @ion-focus="
                                      modals
                                      .experiencia[
                                        index
                                      ]
                                      .isAnoInicioOpen =
                                        true
                                    "
                                  ></ion-input>

                                  <ion-modal
                                    :is-open="
                                      modals
                                      .experiencia[
                                        index
                                      ]
                                      .isAnoInicioOpen
                                    "
                                    @did-dismiss="
                                      modals
                                      .experiencia[
                                        index
                                      ]
                                      .isAnoInicioOpen =
                                        false
                                    "
                                  >
                                    <ion-datetime
                                      presentation="year"
                                      :prefer-wheel="true"
                                      :show-default-buttons="true"
                                      cancel-text="Cancelar"
                                      done-text="Ok"
                                      @ion-change="
                                        setValue(
                                          convertYear(
                                            $event,
                                          ),
                                        )
                                      "
                                    ></ion-datetime>
                                  </ion-modal>
                                </Field>
                              </ion-item>
                            </ion-col>

                            <ion-col size="6">
                              <ion-item>
                                <Field
                                  :name="`experiencia[${index}].anoFim`"
                                  v-slot="
                                    {
                                      field,
                                      setValue,
                                      meta,
                                      errorMessage,
                                    }
                                  "
                                >
                                  <ion-input
                                    v-bind="field"
                                    placeholder="Ano Fim *"
                                    :class='
                                      !meta
                                        .valid
                                      ? "ion-touched ion-invalid"
                                      : ""
                                    '
                                    :errorText="errorMessage"
                                    @ion-focus="
                                      modals
                                      .experiencia[
                                        index
                                      ]
                                      .isAnoFimOpen =
                                        true
                                    "
                                  ></ion-input>

                                  <ion-modal
                                    :is-open="
                                      modals
                                      .experiencia[
                                        index
                                      ]
                                      .isAnoFimOpen
                                    "
                                    @did-dismiss="
                                      modals
                                      .experiencia[
                                        index
                                      ]
                                      .isAnoFimOpen =
                                        false
                                    "
                                  >
                                    <ion-datetime
                                      presentation="year"
                                      :prefer-wheel="true"
                                      :show-default-buttons="true"
                                      cancel-text="Cancelar"
                                      done-text="Ok"
                                      @ion-change="
                                        setValue(
                                          convertYear(
                                            $event,
                                          ),
                                        )
                                      "
                                    ></ion-datetime>
                                  </ion-modal>
                                </Field>
                              </ion-item>
                            </ion-col>
                          </ion-row>

                          <ion-row>
                            <ion-col size="12">
                              <ion-item>
                                <Field
                                  :name="`experiencia[${index}].posicao.text`"
                                  v-slot="
                                    {
                                      field,
                                      meta,
                                      errorMessage,
                                    }
                                  "
                                >
                                  <ion-input
                                    v-bind="field"
                                    placeholder="Posicao *"
                                    :class='
                                      !meta
                                        .valid
                                      ? "ion-touched ion-invalid"
                                      : ""
                                    '
                                    :errorText="errorMessage"
                                    @ionInput="
                                      () =>
                                      adjustFont(
                                        `experiencia[${index}].posicao`,
                                        110,
                                      )
                                    "
                                  ></ion-input>
                                </Field>
                              </ion-item>
                            </ion-col>
                          </ion-row>

                          <ion-row>
                            <ion-col size="12">
                              <ion-item>
                                <Field
                                  :name="`experiencia[${index}].info.text`"
                                  v-slot="
                                    {
                                      field,
                                      setValue,
                                      meta,
                                      errorMessage,
                                    }
                                  "
                                >
                                  <ion-textarea
                                    :value='
                                      field
                                      .value
                                      .join(
                                        "\n",
                                      )
                                    '
                                    placeholder="Informação... (opcional)"
                                    :class='
                                      !meta
                                        .valid
                                      ? "ion-touched ion-invalid"
                                      : ""
                                    '
                                    :errorText="errorMessage"
                                    @ionInput='
                                      (
                                        event,
                                      ) => {
                                        setValue(
                                          event
                                            .target
                                            .value!
                                            .split(
                                              "\n",
                                            ),
                                        );

                                        adjustFontMultiline(
                                          `experiencia[${index}].info`,
                                          110,
                                          20,
                                        );
                                      }
                                    '
                                  ></ion-textarea>
                                </Field>
                              </ion-item>
                            </ion-col>
                          </ion-row>
                        </ion-col>

                        <ion-col size="2" size-lg="1">
                          <ion-button
                            color="primary"
                            class="w-full h-full !flex items-center justify-center"
                            fill="clear"
                            @click='
                              remove(index);
                              validateField(
                                "experiencia",
                              );
                            '
                            v-if="index > 0"
                          >
                            <ion-icon slot="icon-only" name="close"></ion-icon>
                          </ion-button>
                        </ion-col>
                      </ion-row>
                    </ion-grid>
                  </div>

                  <ion-button
                    color="primary"
                    expand="full"
                    @click="
                      push({
                        empresa: {
                          text: meta.initialValues?.experiencia[0]
                            .empresa.text,
                          fontSize: meta.initialValues
                            ?.experiencia[0].empresa.fontSize,
                        },
                        anoInicio: meta.initialValues
                          ?.experiencia[0].anoInicio,
                        anoFim: meta.initialValues?.experiencia[0]
                          .anoFim,
                        posicao: {
                          text: meta.initialValues?.experiencia[0]
                            .posicao.text,
                          fontSize: meta.initialValues
                            ?.experiencia[0].fontSize,
                        },
                        info: {
                          text: meta.initialValues?.experiencia[0]
                            .info.text,
                          fontSize: meta.initialValues
                            ?.experiencia[0].info.fontSize,
                        },
                      });
                      addItem({
                        isAnoInicioOpen: false,
                        isAnoFimOpen: false,
                      }, modals.experiencia!);
                    "
                  >Adicionar Experiência</ion-button>

                  <Field name="experiencia" as="div" v-slot="{ errorMessage }">
                    <p class="text-[#f24c58]">{{ errorMessage }}</p>
                  </Field>
                </FieldArray>
              </div>
            </ion-card-content>
          </ion-card>

          <ion-card class="mb-6">
            <ion-card-content>
              <div class="grid gap-2">
                <FieldArray
                  ref="formacao-field-array"
                  name="formacao"
                  v-slot="{ fields, push, remove }"
                >
                  <div
                    v-for="(field, index) in fields"
                    :key="field.key"
                    class="grid gap-2"
                  >
                    <ion-label position="stacked"
                    >Formação {{
                        fields.length > 1
                        ? `#${index + 1}`
                        : ""
                      }}*</ion-label>
                    <ion-grid>
                      <ion-row>
                        <ion-col>
                          <ion-row>
                            <ion-col size="12">
                              <ion-item>
                                <Field
                                  :name="`formacao[${index}].curso.text`"
                                  v-slot="
                                    {
                                      field,
                                      meta,
                                      errorMessage,
                                    }
                                  "
                                >
                                  <ion-input
                                    v-bind="field"
                                    placeholder="Curso *"
                                    :class='
                                      !meta
                                        .valid
                                      ? "ion-touched ion-invalid"
                                      : ""
                                    '
                                    :errorText="errorMessage"
                                    @ionInput='
                                      () =>
                                      adjustFont(
                                        `formacao[${index}].curso`,
                                        64,
                                        "Ruda",
                                      )
                                    '
                                  ></ion-input>
                                </Field>
                              </ion-item>
                            </ion-col>
                          </ion-row>

                          <ion-row>
                            <ion-col size="6">
                              <ion-item>
                                <Field
                                  :name="`formacao[${index}].anoInicio`"
                                  v-slot="
                                    {
                                      field,
                                      setValue,
                                      meta,
                                      errorMessage,
                                    }
                                  "
                                >
                                  <ion-input
                                    v-bind="field"
                                    placeholder="Ano Início *"
                                    :class='
                                      !meta
                                        .valid
                                      ? "ion-touched ion-invalid"
                                      : ""
                                    '
                                    :errorText="errorMessage"
                                    @ion-focus="
                                      modals
                                      .formacao[
                                        index
                                      ]
                                      .isAnoInicioOpen =
                                        true
                                    "
                                  ></ion-input>

                                  <ion-modal
                                    :is-open="
                                      modals
                                      .formacao[
                                        index
                                      ]
                                      .isAnoInicioOpen
                                    "
                                    @did-dismiss="
                                      modals
                                      .formacao[
                                        index
                                      ]
                                      .isAnoInicioOpen =
                                        false
                                    "
                                  >
                                    <ion-datetime
                                      presentation="year"
                                      :prefer-wheel="true"
                                      :show-default-buttons="true"
                                      cancel-text="Cancelar"
                                      done-text="Ok"
                                      @ion-change="
                                        setValue(
                                          convertYear(
                                            $event,
                                          ),
                                        )
                                      "
                                    ></ion-datetime>
                                  </ion-modal>
                                </Field>
                              </ion-item>
                            </ion-col>

                            <ion-col size="6">
                              <ion-item>
                                <Field
                                  :name="`formacao[${index}].anoFim`"
                                  v-slot="
                                    {
                                      field,
                                      setValue,
                                      meta,
                                      errorMessage,
                                    }
                                  "
                                >
                                  <ion-input
                                    v-bind="field"
                                    placeholder="Ano Fim *"
                                    :class='
                                      !meta
                                        .valid
                                      ? "ion-touched ion-invalid"
                                      : ""
                                    '
                                    :errorText="errorMessage"
                                    @ion-focus="
                                      modals
                                      .formacao[
                                        index
                                      ]
                                      .isAnoFimOpen =
                                        true
                                    "
                                  ></ion-input>

                                  <ion-modal
                                    :is-open="
                                      modals
                                      .formacao[
                                        index
                                      ]
                                      .isAnoFimOpen
                                    "
                                    @did-dismiss="
                                      modals
                                      .formacao[
                                        index
                                      ]
                                      .isAnoFimOpen =
                                        false
                                    "
                                  >
                                    <ion-datetime
                                      presentation="year"
                                      :prefer-wheel="true"
                                      :show-default-buttons="true"
                                      cancel-text="Cancelar"
                                      done-text="Ok"
                                      @ion-change="
                                        setValue(
                                          convertYear(
                                            $event,
                                          ),
                                        )
                                      "
                                    ></ion-datetime>
                                  </ion-modal>
                                </Field>
                              </ion-item>
                            </ion-col>
                          </ion-row>

                          <ion-row>
                            <ion-col size="12">
                              <ion-item>
                                <Field
                                  :name="`formacao[${index}].universidade.text`"
                                  v-slot="
                                    {
                                      field,
                                      meta,
                                      errorMessage,
                                    }
                                  "
                                >
                                  <ion-input
                                    v-bind="field"
                                    placeholder="Universidade *"
                                    :class='
                                      !meta
                                        .valid
                                      ? "ion-touched ion-invalid"
                                      : ""
                                    '
                                    :errorText="errorMessage"
                                    @ionInput="
                                      () =>
                                      adjustFont(
                                        `formacao[${index}].universidade`,
                                        62,
                                      )
                                    "
                                  ></ion-input>
                                </Field>
                              </ion-item>
                            </ion-col>
                          </ion-row>
                        </ion-col>

                        <ion-col size="2" size-lg="1">
                          <ion-button
                            color="primary"
                            class="w-full h-full !flex items-center justify-center"
                            fill="clear"
                            @click='
                              remove(index);
                              validateField(
                                "formacao",
                              );
                            '
                            v-if="index > 0"
                          >
                            <ion-icon slot="icon-only" name="close"></ion-icon>
                          </ion-button>
                        </ion-col>
                      </ion-row>
                    </ion-grid>
                  </div>

                  <ion-button
                    color="primary"
                    expand="full"
                    @click="
                      push({
                        curso: {
                          text: meta.initialValues?.formacao[0]
                            .curso.text,
                          fontSize: meta.initialValues
                            ?.formacao[0].curso.fontSize,
                        },
                        anoInicio: meta.initialValues?.formacao[0]
                          .anoInicio,
                        anoFim: meta.initialValues?.formacao[0]
                          .anoFim,
                        universidade: {
                          text: meta.initialValues?.formacao[0]
                            .universidade.text,
                          fontSize: meta.initialValues
                            ?.formacao[0].universidade.fontSize,
                        },
                      });
                      addItem({
                        isAnoInicioOpen: false,
                        isAnoFimOpen: false,
                      }, modals.formacao!);
                    "
                  >Adicionar Formação</ion-button>

                  <Field name="formacao" as="div" v-slot="{ errorMessage }">
                    <p class="text-[#f24c58]">{{ errorMessage }}</p>
                  </Field>
                </FieldArray>
              </div>
            </ion-card-content>
          </ion-card>

          <ion-card class="mb-6">
            <ion-card-content>
              <div class="grid gap-2">
                <ion-label position="stacked">Habilidades (opcional)</ion-label>

                <FieldArray
                  ref="habilidades-field-array"
                  name="habilidades"
                  v-slot="{ fields, push, remove }"
                >
                  <ion-item v-for="(field, index) in fields" :key="field.key">
                    <ion-grid>
                      <ion-row>
                        <ion-col>
                          <Field
                            :name="`habilidades[${index}].text`"
                            v-slot="
                              {
                                field,
                                meta,
                                errorMessage,
                              }
                            "
                          >
                            <ion-input
                              v-bind="field"
                              :placeholder="
                                `Habilidade #${
                                  index + 1
                                } *`
                              "
                              :class='
                                !meta.valid
                                ? "ion-touched ion-invalid"
                                : ""
                              '
                              :errorText="errorMessage"
                              @ionInput="
                                () =>
                                adjustFont(
                                  `habilidades[${index}]`,
                                  62,
                                )
                              "
                            ></ion-input>
                          </Field>
                        </ion-col>

                        <ion-col size="2" size-lg="1">
                          <ion-button
                            color="primary"
                            class="w-full h-full !flex items-center justify-center"
                            fill="clear"
                            @click='
                              remove(index);
                              validateField(
                                "habilidades",
                              );
                            '
                          >
                            <ion-icon slot="icon-only" name="close"></ion-icon>
                          </ion-button>
                        </ion-col>
                      </ion-row>
                    </ion-grid>
                  </ion-item>

                  <ion-button
                    color="primary"
                    expand="full"
                    @click='
                      push({
                        text: "",
                        fontSize: 4.09046,
                      });
                      validateField("habilidades");
                    '
                  >Adicionar habilidade</ion-button>

                  <Field name="habilidades" as="div" v-slot="{ errorMessage }">
                    <p class="text-[#f24c58]">{{ errorMessage }}</p>
                  </Field>
                </FieldArray>
              </div>
            </ion-card-content>
          </ion-card>

          <ion-card class="mb-6">
            <ion-card-content>
              <div class="grid gap-2">
                <ion-label position="stacked">Idiomas (opcional)</ion-label>

                <FieldArray
                  ref="idiomas-field-array"
                  name="idiomas"
                  v-slot="{ fields, push, remove }"
                >
                  <ion-item v-for="(field, index) in fields" :key="field.key">
                    <ion-grid>
                      <ion-row>
                        <ion-col size="12" size-md="9.5">
                          <Field
                            :name="`idiomas[${index}].lingua.text`"
                            v-slot="
                              {
                                field,
                                meta,
                                errorMessage,
                              }
                            "
                          >
                            <ion-input
                              v-bind="field"
                              :placeholder="
                                `Idioma #${
                                  index + 1
                                } *`
                              "
                              :class='
                                !meta.valid
                                ? "ion-touched ion-invalid"
                                : ""
                              '
                              :errorText="errorMessage"
                              @ionInput="
                                () =>
                                adjustFont(
                                  `idiomas[${index}].lingua`,
                                  46,
                                )
                              "
                            ></ion-input>
                          </Field>
                        </ion-col>

                        <ion-col size="10" size-md="1.5">
                          <Field
                            :name="`idiomas[${index}].nivel`"
                            v-slot="
                              {
                                field,
                                meta,
                                errorMessage,
                                handleChange,
                              }
                            "
                          >
                            <ion-select
                              placeholder="Nível *"
                              interface="popover"
                              :class='
                                !meta.valid &&
                                  meta.touched
                                ? "ion-touched ion-invalid"
                                : ""
                              '
                              :modelValue="field.value"
                              :errorText="errorMessage"
                              @ionChange="handleChange"
                            >
                              <ion-select-option value="Básico"
                              >Básico</ion-select-option>
                              <ion-select-option value="Médio"
                              >Médio</ion-select-option>
                              <ion-select-option value="Avançado"
                              >Avançado</ion-select-option>
                            </ion-select>
                          </Field>
                        </ion-col>

                        <ion-col size="2" size-lg="1">
                          <ion-button
                            color="primary"
                            class="w-full h-full !flex items-center justify-center"
                            fill="clear"
                            @click='
                              remove(index);
                              validateField(
                                "idiomas",
                              );
                            '
                          >
                            <ion-icon
                              slot="icon-only"
                              name="close"
                            ></ion-icon>
                          </ion-button>
                        </ion-col>
                      </ion-row>
                    </ion-grid>
                  </ion-item>

                  <ion-button
                    color="primary"
                    expand="full"
                    @click='
                      push({
                        lingua: {
                          text: "",
                          fontSize: 4.09046,
                        },
                        nivel: "",
                      });
                    '
                  >Adicionar idioma</ion-button>

                  <Field name="idiomas" as="div" v-slot="{ errorMessage }">
                    <p class="text-[#f24c58]">{{ errorMessage }}</p>
                  </Field>
                </FieldArray>
              </div>
            </ion-card-content>
          </ion-card>

          <ion-card class="bg-transparent shadow-none !flex justify-center">
            <ion-button type="submit" color="primary" shape="round">
              {{
                id
                ? "Editar currículo"
                : "Adicionar currículo"
              }}
            </ion-button>
          </ion-card>

          <p class="!flex justify-center text-[#f24c58]">{{ errorMessage }}</p>
        </Form>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, useTemplateRef } from "vue";

import { useRoute, useRouter } from "vue-router";

import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonDatetime,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  IonToolbar,
  // ItemReorderEventDetail,
} from "@ionic/vue";

import { Camera } from "@capacitor/camera";
import { Filesystem } from "@capacitor/filesystem";
import { Capacitor } from "@capacitor/core";

import { addIcons } from "ionicons";
import { add, close, reload, trash } from "ionicons/icons";

import { Field, FieldArray, Form } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";

import z from "zod";

import get from "lodash/get";

import { useCrudCurriculum } from "@/composables/crud-curriculum";

addIcons({
  add: add,
  close: close,
  trash: trash,
  reload: reload,
});

const route = useRoute();

const id = route.params.id;

const {
  fetchCurriculumById,
  createCurriculum,
  updateCurriculum,
} = useCrudCurriculum();

const form = useTemplateRef("form");

const errorMessage = ref("");

const contatoIconeCompare = (
  a: any,
  b: any,
) => {
  return a?.d ===
      b?.d &&
    a?.size ===
      b?.size;
};

const validationSchema = toTypedSchema(
  z.object({
    id: z.string().optional(),
    imagem: z.string().nullish().optional(),
    nome: z.object({
      text: z.string().nonempty("Nome é obrigatório"),
      fontSize: z.number(),
    }).superRefine((data, ctx) => {
      if (data.fontSize <= 3) {
        ctx.addIssue({
          code: "custom",
          path: ["text"],
          message: "Nome muito longo",
        });
      }
    }).default({
      text: "",
      fontSize: 17.8911,
    }),
    sobrenome: z.object({
      text: z.string().nonempty("Sobrenome é obrigatório"),
      fontSize: z.number(),
    }).superRefine((data, ctx) => {
      if (data.fontSize <= 3) {
        ctx.addIssue({
          code: "custom",
          path: ["text"],
          message: "Sobrenome muito longo",
        });
      }
    }).default({
      text: "",
      fontSize: 17.8911,
    }),
    sobre: z.object({
      text: z.array(
        z.string().nullish(),
      ).superRefine(
        (line, ctx) => {
          if (line[0]?.length == 0) {
            ctx.addIssue({
              code: "custom",
              path: [0, "sobre"],
              message: `Descreva suas experiências`,
            });
          }
        },
      ),
      fontSize: z.number(),
    }).superRefine((data, ctx) => {
      if (data.fontSize <= 3) {
        ctx.addIssue({
          code: "custom",
          path: ["text"],
          message:
            'Texto do campo "Sobre" muito longo. Reduza o número de linhas e/ou quebre-as para caber',
        });
      }
    }).default({
      text: [""],
      fontSize: 4.09046,
    }),
    contato: z.array(
      z.object({
        icone: z.object({
          d: z.string().nullish(),
          size: z.number().nullish(),
        }),
        info: z.object({
          text: z.string().nonempty("Contato é obrigatório"),
          fontSize: z.number(),
        }).superRefine((data, ctx) => {
          if (data.fontSize <= 3) {
            ctx.addIssue({
              code: "custom",
              path: ["text"],
              message: "Contato muito longo",
            });
          }
        }),
        listIndex: z.number().optional(),
      }),
    ).max(3, { message: "Você só pode adicionar até 3 contatos" }).superRefine(
      (data, ctx) => {
        data.forEach((fields, index) => {
          if (fields.icone.d?.length == 0) {
            ctx.addIssue({
              code: "custom",
              path: [index, "icone.d"],
              message: `Ícone é obrigatório`,
            });
          }

          if (fields.info.text.length == 0) {
            ctx.addIssue({
              code: "custom",
              path: [index, "info"],
              message: `Informação do contato é obrigatória`,
            });
          }
        });
      },
    ).default([
      {
        icone: {
          d: "",
          size: null,
        },
        info: {
          text: "",
          fontSize: 4.09046,
        },
      },
    ]),
    experiencia: z.array(
      z.object({
        empresa: z.object({
          text: z.string().nullish(),
          fontSize: z.number(),
        }).superRefine((data, ctx) => {
          if (data.fontSize <= 3) {
            ctx.addIssue({
              code: "custom",
              path: ["text"],
              message: "Empresa muito longa",
            });
          }
        }),
        anoInicio: z.number().nullish(),
        anoFim: z.number().nullish(),
        posicao: z.object({
          text: z.string().nullish(),
          fontSize: z.number(),
        }).superRefine((data, ctx) => {
          if (data.fontSize <= 3) {
            ctx.addIssue({
              code: "custom",
              path: ["text"],
              message: "Posição muito longa",
            });
          }
        }),
        info: z.object({
          text: z.array(
            z.string().nullish().optional(),
          ),
          fontSize: z.number(),
        }).superRefine((data, ctx) => {
          if (data.fontSize <= 3) {
            ctx.addIssue({
              code: "custom",
              path: ["text"],
              message:
                'Texto do campo "Informação" muito longo. Reduza o número de linhas e/ou quebre-as para caber',
            });
          }
        }),
        listIndex: z.number().optional(),
      }),
    ).superRefine((data, ctx) => {
      data.forEach((fields, index) => {
        if (fields.empresa?.text?.length == 0) {
          ctx.addIssue({
            code: "custom",
            path: [index, "empresa.text"],
            message: `Empresa é obrigatória`,
          });
        }

        if (!fields.anoInicio) {
          ctx.addIssue({
            code: "custom",
            path: [index, "anoInicio"],
            message: `Ano de inicio é obrigatório`,
          });
        }

        if (!fields.anoFim) {
          ctx.addIssue({
            code: "custom",
            path: [index, "anoFim"],
            message: `Ano de saída é obrigatório`,
          });
        }

        if (fields.posicao?.text?.length == 0) {
          ctx.addIssue({
            code: "custom",
            path: [index, "posicao.text"],
            message: `Posição é obrigatória`,
          });
        }
      });
    }).default([
      {
        empresa: {
          text: "",
          fontSize: 4.77573,
        },
        anoInicio: null,
        anoFim: null,
        posicao: {
          text: "",
          fontSize: 4.42383,
        },
        info: {
          text: [""],
          fontSize: 4.09046,
        },
      },
    ]),
    formacao: z.array(
      z.object({
        curso: z.object({
          text: z.string().nullish(),
          fontSize: z.number(),
        }).superRefine((data, ctx) => {
          if (data.fontSize <= 3) {
            ctx.addIssue({
              code: "custom",
              path: ["text"],
              message: "Curso muito longo",
            });
          }
        }),
        anoInicio: z.number().nullish(),
        anoFim: z.number().nullish(),
        universidade: z.object({
          text: z.string().nullish(),
          fontSize: z.number(),
        }).superRefine((data, ctx) => {
          if (data.fontSize <= 3) {
            ctx.addIssue({
              code: "custom",
              path: ["text"],
              message: "Universidade muito longa",
            });
          }
        }),
        listIndex: z.number().optional(),
      }),
    ).max(2, { message: "Você só pode adicionar até 2 formações" }).superRefine(
      (data, ctx) => {
        data.forEach((fields, index) => {
          if (fields.curso?.text?.length == 0) {
            ctx.addIssue({
              code: "custom",
              path: [index, "curso.text"],
              message: `Curso é obrigatório`,
            });
          }

          if (!fields.anoInicio) {
            ctx.addIssue({
              code: "custom",
              path: [index, "anoInicio"],
              message: `Ano de inicio é obrigatório`,
            });
          }

          if (!fields.anoFim) {
            ctx.addIssue({
              code: "custom",
              path: [index, "anoFim"],
              message: `Ano de conclusão é obrigatório`,
            });
          }

          if (fields.universidade?.text?.length == 0) {
            ctx.addIssue({
              code: "custom",
              path: [index, "universidade.text"],
              message: `Universidade é obrigatória`,
            });
          }
        });
      },
    ).default([
      {
        curso: {
          text: "",
          fontSize: 4.77573,
        },
        anoInicio: null,
        anoFim: null,
        universidade: {
          text: "",
          fontSize: 4.42383,
        },
      },
    ]),
    habilidades: z.array(
      z.object({
        text: z.string().nonempty(
          "Habilidade é obrigatória",
        ),
        fontSize: z.number(),
      }).superRefine((data, ctx) => {
        if (data.fontSize <= 3) {
          ctx.addIssue({
            code: "custom",
            path: ["text"],
            message: "Habilidade muito longa",
          });
        }
      }).default({
        text: "",
        fontSize: 4.09046,
      }),
    ).max(5, { message: "Você só pode adicionar até 5 habilidades" }).nullish(),
    idiomas: z.array(
      z.object({
        lingua: z.object({
          text: z.string().nullish(),
          fontSize: z.number(),
        }).superRefine((data, ctx) => {
          if (data.fontSize <= 3) {
            ctx.addIssue({
              code: "custom",
              path: ["text"],
              message: "Idioma muito longo",
            });
          }
        }),
        nivel: z.enum(["Básico", "Médio", "Avançado"], {
          message: "Nível é obrigatório",
        }).nullish(),
        listIndex: z.number().optional(),
      }).default({
        lingua: {
          text: "",
          fontSize: 4.09046,
        },
        nivel: null,
      }),
    ).max(3, { message: "Você só pode adicionar até 3 idiomas" }).nullish()
      .superRefine((data, ctx) => {
        if (data && data?.length > 0) {
          data?.forEach((fields, index) => {
            if (!fields.lingua.text || fields.lingua?.text?.length == 0) {
              ctx.addIssue({
                code: "custom",
                path: [index, "lingua.text"],
                message: `Idioma é obrigatório`,
              });
            }
          });
        }
      }),
  }),
);

const router = useRouter();

async function onSubmit(values: any) {
  try {
    if (id) {
      await updateCurriculum(id as string, values);
    } else {
      await createCurriculum(values);
    }
  } catch {
    errorMessage.value = id
      ? "Houve um erro interno ao atualizar o currículo."
      : "Houve um erro interno ao cadastrar o currículo.";

    return;
  }

  router.push("/");
}

const modals = reactive({
  experiencia: [
    {
      isAnoInicioOpen: false,
      isAnoFimOpen: false,
    },
  ],
  formacao: [
    {
      isAnoInicioOpen: false,
      isAnoFimOpen: false,
    },
  ],
});

const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const addImagem = async () => {
  try {
    const imagem = await Camera.pickImages({
      quality: 90,
      limit: 1,
    });

    if (imagem.photos[0]) {
      const photo = imagem.photos[0];

      let imageUrl = "";
      if (Capacitor.getPlatform() === "web") {
        const response = await fetch(photo.webPath!);
        const blob = await response.blob();
        imageUrl = await blobToBase64(blob);
      } else {
        const file = await Filesystem.readFile({
          path: photo.path!,
        });
        imageUrl = `data:image/jpeg;base64,${file.data}`;
      }

      form.value?.setFieldValue("imagem", imageUrl);
    }
  } catch (error) {
    console.error("Error capturing image:", error);
  }
};

const removeImagem = async () => {
  form.value?.setFieldValue("imagem", null);
};

const isRemoveImageAlertOpen = ref(false);

const removeImageAlertButtons = [
  {
    text: "Não",
    role: "cancel",
    handler: () => {
      isRemoveImageAlertOpen.value = false;
    },
  },
  {
    text: "Sim",
    role: "confirm",
    handler: () => {
      removeImagem();
      isRemoveImageAlertOpen.value = false;
    },
  },
];

const addItem = (object: any, list: any[]) => {
  list.push(object);

  list.forEach((item: { listIndex: number }, i: number) => {
    item.listIndex = i;
  });
};

const convertYear = (event: any) => {
  return Number
    .parseInt(
      (event.detail
        .value as string)
        .split("-")[0],
    );
};

const adjustFont = async (
  fieldPath: string,
  maxWidth: number,
  fontFamily: string = "Nunito-Light",
  minFontSize: number = 3,
  fontDecrease: number = 1,
) => {
  await document.fonts.ready;

  const fieldData = get(form.value?.values, fieldPath);

  const text = fieldData?.text;

  if (!fieldData || !text) return;

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) return;

  const baseFontSize = get(
    form.value?.meta.initialValues,
    `${fieldPath}.fontSize`,
    12,
  );
  let fontSize = baseFontSize;

  context.font = `${fontSize}px ${fontFamily}`;

  let textWidth = context.measureText(text).width;

  while (textWidth > maxWidth && fontSize > minFontSize) {
    fontSize -= fontDecrease;
    context.font = `${fontSize}px ${fontFamily}`;
    textWidth = context.measureText(text).width;
  }

  form.value?.setFieldValue(`${fieldPath}.fontSize`, fontSize);
};

const adjustFontMultiline = async (
  fieldPath: string,
  maxWidth: number,
  maxHeight: number,
  fontFamily: string = "Nunito-Light",
  minFontSize: number = 3,
  fontDecrease: number = 1,
  lineHeightPx: number = 5,
) => {
  await document.fonts.ready;

  const fieldData = get(form.value?.values, fieldPath);
  const lines = fieldData?.text;
  if (!fieldData || !lines) return;

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) return;

  const baseFontSize = get(
    form.value?.meta.initialValues,
    `${fieldPath}.fontSize`,
    12,
  );
  let fontSize = baseFontSize;

  const fits = (size: number) => {
    context.font = `${size}px ${fontFamily}`;
    const widestLine = Math.max(
      ...lines.map((line: string) => context.measureText(line).width),
    );
    const totalHeight = (lines.length - 1) * lineHeightPx + size;

    return widestLine <= maxWidth && totalHeight <= maxHeight;
  };

  while (!fits(fontSize) && fontSize > minFontSize) {
    fontSize -= fontDecrease;
  }

  form.value?.setFieldValue(`${fieldPath}.fontSize`, fontSize);
};

onMounted(async () => {
  if (!id) return;

  const fetchedCurriculum = await fetchCurriculumById(
    id as string,
  );

  if (fetchedCurriculum) {
    fetchedCurriculum.formacao.forEach(() => {
      addItem({
        isAnoInicioOpen: false,
        isAnoFimOpen: false,
      }, modals.formacao!);
    });
    fetchedCurriculum.experiencia.forEach(() => {
      addItem({
        isAnoInicioOpen: false,
        isAnoFimOpen: false,
      }, modals.experiencia!);
    });

    form.value?.setValues(fetchedCurriculum);
  }
});
</script>

<style scoped>
ion-col {
  padding-left: 10px;
  padding-right: 10px;
}

ion-modal {
  --height: auto;
  --width: auto;
}
</style>
