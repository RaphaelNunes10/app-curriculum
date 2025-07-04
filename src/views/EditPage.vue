<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title>
          {{ id ? "Editar curriculum" : "Adicionar curriculum" }}
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="flex flex-col" :fullscreen="true">
      <ion-header class="flex-0" collapse="condense">
        <ion-toolbar>
          <ion-title>
            {{ id ? "Editar curriculum" : "Adicionar curriculum" }}
          </ion-title>
        </ion-toolbar>
      </ion-header>

      <div
        id="container"
        class="flex-0 relative container mx-auto p-6"
      >
        <Form
          ref="form"
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
                      color="primary"
                      shape="round"
                      class="w-10 absolute top-0 right-0 mx-auto aspect-square"
                      @click="addImagem"
                    >
                      <ion-icon slot="icon-only" name="reload"></ion-icon>
                    </ion-button>
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
                  <Field name="nome" v-slot="{ field, meta, errorMessage }">
                    <ion-input
                      v-bind="field"
                      placeholder="Seu Nome"
                      :class='
                        !meta.valid
                        ? "ion-touched ion-invalid"
                        : ""
                      '
                      :errorText="errorMessage"
                    ></ion-input>
                  </Field>
                </ion-item>

                <ion-label position="stacked">Sobrenome *</ion-label>
                <ion-item>
                  <Field
                    name="sobrenome"
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
                    name="sobre"
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
                      @ionInput='
                        setValue($event
                        .target.value!
                        .split("\n"))
                      '
                      placeholder="Sobre..."
                      :class='
                        !meta.valid
                        ? "ion-touched ion-invalid"
                        : ""
                      '
                      :errorText="errorMessage"
                    ></ion-textarea>
                  </Field>
                </ion-item>
              </div>
            </ion-card-content>
          </ion-card>

          <ion-card class="mb-6">
            <ion-card-content>
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
                              :compareWith="
                                (
                                  a: any,
                                  b: any,
                                ) => {
                                  return a?.d ===
                                      b?.d &&
                                    a?.size ===
                                      b?.size;
                                }
                              "
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
                            </ion-select>
                          </Field>
                          <Field
                            :name="`contato[${index}].info`"
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
                            ></ion-input>
                          </Field>
                        </ion-item>
                      </ion-col>
                      <ion-col size="2" size-lg="1">
                        <ion-button
                          color="primary"
                          class="w-full h-full !flex items-center justify-center"
                          fill="clear"
                          @click="remove(index)"
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
                  @click='
                    push({
                      icone: {
                        d: "",
                        size: 35,
                      },
                      info: "",
                    })
                  '
                >Adicionar contato</ion-button>
              </FieldArray>
            </ion-card-content>
          </ion-card>

          <ion-card class="mb-6">
            <ion-card-content>
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
                                :name="`experiencia[${index}].empresa`"
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
                                    !meta.valid
                                    ? "ion-touched ion-invalid"
                                    : ""
                                  '
                                  :errorText="errorMessage"
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
                                    !meta.valid
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
                                    !meta.valid
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
                                :name="`experiencia[${index}].posicao`"
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
                                    !meta.valid
                                    ? "ion-touched ion-invalid"
                                    : ""
                                  '
                                  :errorText="errorMessage"
                                ></ion-input>
                              </Field>
                            </ion-item>
                          </ion-col>
                        </ion-row>

                        <ion-row>
                          <ion-col size="12">
                            <ion-item>
                              <Field
                                :name="`experiencia[${index}].info`"
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
                                    field.value
                                    .join(
                                      "\n",
                                    )
                                  '
                                  placeholder="Informação... (opcional)"
                                  :class='
                                    !meta.valid
                                    ? "ion-touched ion-invalid"
                                    : ""
                                  '
                                  :errorText="errorMessage"
                                  @ionInput='
                                    setValue(
                                      $event
                                        .target
                                        .value!
                                        .split(
                                          "\n",
                                        ),
                                    )
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
                          @click="remove(index)"
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
                  @click='
                    push({
                      empresa: "",
                      anoInicio: null,
                      anoFim: null,
                      posicao: "",
                      info: [""],
                    });
                    addItem({
                      isAnoInicioOpen: false,
                      isAnoFimOpen: false,
                    }, modals.experiencia!);
                  '
                >Adicionar Experiência</ion-button>
              </FieldArray>
            </ion-card-content>
          </ion-card>

          <ion-card class="mb-6">
            <ion-card-content>
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
                                :name="`formacao[${index}].universidade`"
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
                                    !meta.valid
                                    ? "ion-touched ion-invalid"
                                    : ""
                                  '
                                  :errorText="errorMessage"
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
                                    !meta.valid
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
                                    !meta.valid
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
                                :name="`formacao[${index}].curso`"
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
                                    !meta.valid
                                    ? "ion-touched ion-invalid"
                                    : ""
                                  '
                                  :errorText="errorMessage"
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
                          @click="remove(index)"
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
                  @click='
                    push({
                      universidade: "",
                      anoInicio: null,
                      anoFim: null,
                      curso: "",
                    });
                    addItem({
                      isAnoInicioOpen: false,
                      isAnoFimOpen: false,
                    }, modals.formacao!);
                  '
                >Adicionar Formação</ion-button>
              </FieldArray>
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
                            :name="`habilidades[${index}]`"
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
                            ></ion-input>
                          </Field>
                        </ion-col>
                        <ion-col size="2" size-lg="1">
                          <ion-button
                            color="primary"
                            class="w-full h-full !flex items-center justify-center"
                            fill="clear"
                            @click="remove(index)"
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
                    @click='push("")'
                  >Adicionar habilidade</ion-button>
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
                        <ion-col>
                          <ion-row>
                            <ion-col>
                              <Field
                                :name="`idiomas[${index}].lingua`"
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
                                ></ion-input>
                              </Field>
                            </ion-col>

                            <ion-col
                              size="12"
                              size-sm="4"
                              size-md="3"
                              size-lg="2"
                            >
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
                                    !meta
                                      .valid &&
                                      meta
                                        .touched
                                    ? "ion-touched ion-invalid"
                                    : ""
                                  '
                                  :modelValue="
                                    field
                                    .value
                                  "
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
                          </ion-row>
                        </ion-col>

                        <ion-col size="2" size-lg="1">
                          <ion-button
                            color="primary"
                            class="w-full h-full !flex items-center justify-center"
                            fill="clear"
                            @click="remove(index)"
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
                        lingua: "",
                        nivel: "",
                      })
                    '
                  >Adicionar idioma</ion-button>
                </FieldArray>
              </div>
            </ion-card-content>
          </ion-card>

          <ion-card class="bg-transparent shadow-none !flex justify-center">
            <ion-button type="submit" color="primary" shape="round">
              {{
                id
                ? "Editar curriculum"
                : "Adicionar curriculum"
              }}
            </ion-button>
          </ion-card>

          <p class="!flex justify-center text-red-600">{{ errorMessage }}</p>
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
import { add, close, reload } from "ionicons/icons";

import { Field, FieldArray, Form } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";

import z from "zod";

import { useCrudCurriculum } from "@/composables/crud-curriculum";

addIcons({
  add: add,
  close: close,
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

const validationSchema = toTypedSchema(
  z.object({
    id: z.number().optional(),
    imagem: z.string().nullish().optional(),
    nome: z.string().nonempty("Nome é obrigatório").default(""),
    sobrenome: z.string().nonempty("Sobrenome é obrigatório").default(""),
    sobre: z.array(z.string().nullish()).superRefine((line, ctx) => {
      if (line[0]?.length == 0) {
        ctx.addIssue({
          code: "custom",
          path: [0, "sobre"],
          message: `Descreva suas experiências`,
        });
      }
    }).default([
      "",
    ]),
    contato: z.array(
      z.object({
        icone: z.object({
          d: z.string().nullish(),
          size: z.number().nullish(),
        }),
        info: z.string().nonempty("Contato é obrigatório"),
        listIndex: z.number().optional(),
      }),
    ).superRefine((data, ctx) => {
      data.forEach((fields, index) => {
        if (fields.icone.d?.length == 0) {
          ctx.addIssue({
            code: "custom",
            path: [index, "icone.d"],
            message: `Ícone é obrigatório`,
          });
        }

        if (!fields.icone.size) {
          ctx.addIssue({
            code: "custom",
            path: [index, "icone.size"],
            message: `Tamanho do icone é obrigatório`,
          });
        }

        if (fields.info.length == 0) {
          ctx.addIssue({
            code: "custom",
            path: [index, "info"],
            message: `Informação do contato é obrigatória`,
          });
        }
      });
    }).default([
      {
        icone: {
          d: "",
          size: null,
        },
        info: "",
      },
    ]),
    experiencia: z.array(
      z.object({
        empresa: z.string().nullish(),
        anoInicio: z.number().nullish(),
        anoFim: z.number().nullish(),
        posicao: z.string().nullish(),
        info: z.array(z.string().nullish().optional()),
        listIndex: z.number().optional(),
      }),
    ).superRefine((data, ctx) => {
      data.forEach((fields, index) => {
        if (fields.empresa?.length == 0) {
          ctx.addIssue({
            code: "custom",
            path: [index, "empresa"],
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

        if (fields.posicao?.length == 0) {
          ctx.addIssue({
            code: "custom",
            path: [index, "posicao"],
            message: `Posição é obrigatória`,
          });
        }
      });
    }).default([
      {
        empresa: "",
        anoInicio: null,
        anoFim: null,
        posicao: "",
        info: [""],
      },
    ]),
    formacao: z.array(
      z.object({
        curso: z.string().nullish(),
        anoInicio: z.number().nullish(),
        anoFim: z.number().nullish(),
        universidade: z.string().nullish(),
        listIndex: z.number().optional(),
      }),
    ).superRefine((data, ctx) => {
      data.forEach((fields, index) => {
        if (fields.curso?.length == 0) {
          ctx.addIssue({
            code: "custom",
            path: [index, "curso"],
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

        if (fields.universidade?.length == 0) {
          ctx.addIssue({
            code: "custom",
            path: [index, "universidade"],
            message: `Universidade é obrigatória`,
          });
        }
      });
    }).default([
      {
        curso: "",
        anoInicio: null,
        anoFim: null,
        universidade: "",
      },
    ]),
    habilidades: z.array(z.string().nonempty("Habilidade é obrigatória"))
      .nullish(),
    idiomas: z.array(
      z.object({
        lingua: z.string().nullish(),
        nivel: z.enum(["Básico", "Médio", "Avançado"], {
          message: "Nível é obrigatório",
        }).nullish(),
        listIndex: z.number().optional(),
      }),
    ).nullish().superRefine((data, ctx) => {
      if (data && data?.length > 0) {
        data?.forEach((fields, index) => {
          if (!fields.lingua || fields.lingua?.length == 0) {
            ctx.addIssue({
              code: "custom",
              path: [index, "lingua"],
              message: `Lingua é obrigatória`,
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
      await updateCurriculum(Number.parseInt(id as string) - 1, values);
    } else {
      await createCurriculum(values);
    }
  } catch {
    errorMessage.value = id
      ? "Houve um erro interno ao atualizar o curriculum."
      : "Houve um erro interno ao cadastrar o curriculum.";

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

onMounted(async () => {
  if (!id) return;

  const fetchedCurriculum = await fetchCurriculumById(
    Number.parseInt(id as string),
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
