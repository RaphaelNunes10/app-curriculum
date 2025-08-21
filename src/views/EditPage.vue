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
                      @click="removeImagem"
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
                          110,
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
                          110,
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
                                    d: "M12 21.237a9.237 9.237 0 1 0 0-18.474a9.237 9.237 0 0 0 0 18.474m2.99-16.971c.36.387.685.838.97 1.335c.523.905.931 1.99 1.195 3.19q.623.156 1.166.348c.668.237 1.255.517 1.72.84a8.31 8.31 0 0 0-5.051-5.713m5.171 9.196c-.483.359-1.113.668-1.84.925q-.498.176-1.066.322c-.254 1.4-.7 2.66-1.294 3.69a7.4 7.4 0 0 1-.971 1.335a8.3 8.3 0 0 0 5.171-6.272m-11.15 6.272a7.4 7.4 0 0 1-.972-1.335c-.593-1.03-1.04-2.29-1.294-3.69a13 13 0 0 1-1.066-.322c-.727-.257-1.357-.566-1.84-.925a8.3 8.3 0 0 0 5.171 6.272M3.958 9.978c.465-.322 1.052-.602 1.72-.839q.543-.191 1.166-.348c.264-1.2.672-2.285 1.194-3.19a7.4 7.4 0 0 1 .971-1.335A8.31 8.31 0 0 0 3.96 9.978m11.18-3.905c.409.71.746 1.554.989 2.496a22.5 22.5 0 0 0-3.655-.354v-4.41c.978.19 1.918.97 2.666 2.268m1.204 3.504a21 21 0 0 0-3.87-.415v5.202c1.447-.028 2.792-.183 3.945-.43q.127-.932.128-1.934c0-.845-.071-1.658-.203-2.423m-4.818-5.773v4.41a22.5 22.5 0 0 0-3.654.355c.242-.942.58-1.787.988-2.496c.748-1.297 1.688-2.078 2.666-2.269m0 5.358a21 21 0 0 0-3.87.415A14.3 14.3 0 0 0 7.453 12c0 .667.044 1.314.128 1.933c1.153.248 2.498.403 3.945.43zm-5.531.87q.315-.11.663-.21a15.5 15.5 0 0 0-.062 3.865q-.315-.093-.601-.193c-.76-.269-1.34-.577-1.722-.896c-.385-.321-.515-.605-.515-.835s.13-.514.515-.835c.382-.319.962-.627 1.722-.895m2.865 7.895c-.479-.832-.86-1.85-1.105-2.992c1.138.219 2.418.351 3.771.376v4.885c-.978-.191-1.918-.972-2.666-2.27m3.614 2.269V15.31a22.4 22.4 0 0 0 3.771-.376c-.244 1.143-.626 2.16-1.105 2.992c-.748 1.297-1.688 2.078-2.666 2.269M17.494 12q0 .864-.09 1.687q.315-.092.601-.193c.76-.269 1.34-.577 1.722-.896c.385-.321.515-.605.515-.835s-.13-.514-.515-.835c-.382-.319-.962-.627-1.722-.895q-.315-.111-.663-.211c.1.7.153 1.429.153 2.178",
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
