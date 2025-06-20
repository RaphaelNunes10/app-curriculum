<template>
  <svg
    width="210mm"
    height="297mm"
    viewBox="0 0 210 297"
    version="1.1"
    xml:space="preserve"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:svg="http://www.w3.org/2000/svg"
  >
    <defs>
      <clipPath clipPathUnits="userSpaceOnUse"><path
          d="M 0,0 H 1013.7518 V 3509.375 H 0 Z"
          transform="matrix(0.21736926,0,0,0.21736926,35.641514,36.695671)"
          clip-rule="evenodd"
        /></clipPath>
      <clipPath clipPathUnits="userSpaceOnUse"><path
          d="M 248.03149,0 H 2232.2832 V 51.156494 H 248.03149 Z"
          transform="matrix(2.2580277,0,0,2.2580277,-560.06197,140.48722)"
          clip-rule="evenodd"
        /></clipPath>
      <clipPath clipPathUnits="userSpaceOnUse"><path
          d="M 248.03149,3456.7178 H 2232.2832 v 52.6572 H 248.03149 Z"
          transform="matrix(2.2580277,0,0,2.2580277,-560.06197,-7805.3644)"
          clip-rule="evenodd"
        /></clipPath>
      <clipPath clipPathUnits="userSpaceOnUse"><path
          d="M -1061.6566,-5052.9664 H 10661.327 V 11527.526 H -1061.6566 Z"
          style="stroke-width: 4.72463"
        /></clipPath>
      <clipPath clipPathUnits="userSpaceOnUse"><path
          d="M -4752.1899,-21805.997 H 40418.643 V 42081.715 H -4752.1899 Z"
          style="stroke-width: 18.2049"
        /></clipPath>
      <clipPath clipPathUnits="userSpaceOnUse"><path
          d="M -1221.3583,-5834.2701 H 10996.829 V 11446.617 H -1221.3583 Z"
          style="stroke-width: 4.92421"
        /></clipPath>
    </defs>
    <g transform="translate(-6.9017153,0.36346883)">
      <g transform="translate(-3.4189596e-7,-0.06353245)">
        <path
          style="fill: #ffffff; fill-opacity: 1; fill-rule: nonzero; stroke: none"
          d="M 0,0 H 794 V 1123 H 0 Z"
        />
        <path
          d="M 0,0 H 256 V 837 H 0 Z"
          style="fill: #d9d9d9; fill-opacity: 1; fill-rule: nonzero; stroke: none"
          transform="matrix(0.38950614,0,0,0.38950614,-6.9808729,-14.656658)"
        />
        <path
          d="M 0,0 H 4480 V 256 H 0 Z"
          style="fill: #000000; fill-opacity: 1; fill-rule: nonzero; stroke: none"
          transform="matrix(0.03749585,0,0,0.03749585,27.901714,-5.6311562)"
        />
        <path
          d="M 0,0 H 4480 V 256 H 0 Z"
          style="fill: #000000; fill-opacity: 1; fill-rule: nonzero; stroke: none"
          transform="matrix(0.03749585,0,0,0.03749585,27.901714,292.30528)"
        />
        <image
          width="73.024994"
          height="48.683331"
          style="image-rendering: optimizeSpeed"
          preserveAspectRatio="none"
          :xlink:href="dados.imagem"
          x="19.562456"
          y="20.63653"
        />
        <g>
          <text
            xml:space="preserve"
            x="103.48952"
            y="36.896034"
            style="font-size: 3.175px; stroke-width: 0.264583"
          >
            <tspan
              style="font-variant: normal; font-weight: 900; font-size: 17.8911px; font-family: Ruda-Black; writing-mode: lr-tb; fill: #000000; fill-opacity: 1; fill-rule: nonzero; stroke: none; stroke-width: 0.264583"
              x="103.48952"
              dx="0 0.28525519 0.28449431 0.28542751 0.28537139 0.2845245 0.28449431"
              y="36.896034"
            >
              {{ dados.nome }}
            </tspan>
          </text>
          <text
            xml:space="preserve"
            x="103.48952"
            y="53.829369"
            style="font-size: 3.175px; stroke-width: 0.264583"
          >
            <tspan
              style="font-variant: normal; font-weight: 900; font-size: 17.8911px; font-family: Ruda-Black; writing-mode: lr-tb; fill: #000000; fill-opacity: 1; fill-rule: nonzero; stroke: none; stroke-width: 0.264583"
              x="103.48952"
              dx="0 0.2846711 0.28537139 0.28542751 0.28474653"
              y="53.829369"
            >
              {{ dados.sobrenome }}
            </tspan>
          </text>
        </g>
        <g>
          <text
            xml:space="preserve"
            x="27.901714"
            y="82.393639"
            style="font-size: 3.175px; stroke-width: 0.264583"
          >
            <tspan
              style="font-variant: normal; font-weight: 900; font-size: 4.23333px; font-family: Ruda-Black; writing-mode: lr-tb; fill: #000000; fill-opacity: 1; fill-rule: nonzero; stroke: none; stroke-width: 0.264583"
              x="27.901714"
              y="82.393639"
            >
              CONTATO
            </tspan>
          </text>
          <g>
            <g v-for="(contato, index) in dados.contato" :key="index">
              <path
                :d="`${contato.icone.d}`"
                :transform="
                  `matrix(${contato.icone.size},0,0,${contato.icone.size},27.5,${
                    91 + index * 10
                  })`
                "
              />
              <text
                xml:space="preserve"
                x="36.10054"
                y="96.090752"
                style="font-size: 3.175px; stroke-width: 0.264583"
              >
                <tspan
                  style="font-variant: normal; font-weight: 300; font-size: 4.09046px; font-family: Nunito-Light; writing-mode: lr-tb; fill: #000000; fill-opacity: 1; fill-rule: nonzero; stroke: none; stroke-width: 0.264583"
                  x="36.10054"
                  :y="96.090752 + index * 10"
                >
                  {{ contato.info }}
                </tspan>
              </text>
            </g>
          </g>
        </g>
        <g>
          <text
            xml:space="preserve"
            x="103.49005"
            y="82.393639"
            style="font-size: 3.175px; stroke-width: 0.264583"
          >
            <tspan
              style="font-variant: normal; font-weight: 900; font-size: 4.23333px; font-family: Ruda-Black; writing-mode: lr-tb; fill: #000000; fill-opacity: 1; fill-rule: nonzero; stroke: none; stroke-width: 0.264583"
              x="103.49005"
              y="82.393639"
            >
              SOBRE MIM
            </tspan>
          </text>
          <text
            xml:space="preserve"
            x="103.49005"
            y="96.094856"
            style="font-size: 4.09046px; line-height: 1.35; stroke-width: 0.264583"
          >
            <tspan
              v-for="(linhaSobre, index) in dados.sobre"
              :key="index"
              style="font-style: normal; font-variant: normal; font-weight: 300; font-stretch: normal; font-size: 4.09046px; line-height: 1.35; font-family: Nunito-Light; -inkscape-font-specification: 'Nunito-Light Light'; writing-mode: lr-tb; fill: #000000; fill-opacity: 1; fill-rule: nonzero; stroke: none; stroke-width: 0.264583"
              x="103.49005"
              :y="96.094856 + index * 5"
            >
              {{ linhaSobre }}
            </tspan>
          </text>
        </g>
        <g>
          <text
            xml:space="preserve"
            x="27.901714"
            y="131.21922"
            style="font-size: 3.175px; stroke-width: 0.264583"
          >
            <tspan
              style="font-variant: normal; font-weight: 900; font-size: 4.23333px; font-family: Ruda-Black; writing-mode: lr-tb; fill: #000000; fill-opacity: 1; fill-rule: nonzero; stroke: none; stroke-width: 0.264583"
              x="27.901714"
              y="131.21922"
            >
              FORMAÇÃO
            </tspan>
          </text>
          <g v-for="(formacao, index) in dados.formacao" :key="index">
            <text
              xml:space="preserve"
              x="28.081341"
              :y="146.37514 + index * 23"
              style="font-size: 3.175px; stroke-width: 0.264583"
            >
              <tspan
                style="font-variant: normal; font-weight: normal; font-size: 4.77573px; font-family: Ruda; writing-mode: lr-tb; fill: #000000; fill-opacity: 1; fill-rule: nonzero; stroke: none; stroke-width: 0.264583"
              >
                {{ formacao.curso }}
              </tspan>
            </text>
            <text
              xml:space="preserve"
              x="28.081341"
              :y="152.94672 + index * 23"
              style="font-size: 3.175px; stroke-width: 0.264583"
            >
              <tspan
                style="font-variant: normal; font-weight: normal; font-size: 4.07194px; font-family: Ruda; writing-mode: lr-tb; fill: #000000; fill-opacity: 1; fill-rule: nonzero; stroke: none; stroke-width: 0.264583"
                dx="0 -0.0021578516 -0.0022836903 -0.0020255574 -0.0021982035 0 -0.0021578516 -0.0022836903 -0.0021578516"
              >
                {{ formacao.anoInicio }}
                {{
                  formacao.anoFim
                  ? `- ${formacao.anoFim}`
                  : ""
                }}
              </tspan>
            </text>
            <text
              xml:space="preserve"
              x="28.081341"
              :y="159.40234 + index * 23"
              style="font-size: 3.175px; stroke-width: 0.264583"
            >
              <tspan
                style="font-variant: normal; font-weight: 300; font-size: 4.42383px; font-family: Nunito-Light; writing-mode: lr-tb; fill: #000000; fill-opacity: 1; fill-rule: nonzero; stroke: none; stroke-width: 0.264583"
              >
                {{ formacao.universidade }}
              </tspan>
            </text>
          </g>
        </g>
        <g>
          <text
            xml:space="preserve"
            x="103.49005"
            y="131.21922"
            style="font-size: 3.175px; stroke-width: 0.264583"
          >
            <tspan
              style="font-variant: normal; font-weight: 900; font-size: 4.23333px; font-family: Ruda-Black; writing-mode: lr-tb; fill: #000000; fill-opacity: 1; fill-rule: nonzero; stroke: none; stroke-width: 0.264583"
              x="103.49005"
              y="131.21922"
            >
              EXPERIÊNCIA
            </tspan>
          </text>
          <g v-for="(experiencia, index) in dados.experiencia" :key="index">
            <g>
              <text
                xml:space="preserve"
                x="103.49005"
                :y="146.37514 + index * 47.5"
                style="font-size: 3.175px; stroke-width: 0.264583"
              >
                <tspan
                  style="font-variant: normal; font-weight: normal; font-size: 4.77573px; font-family: Ruda; writing-mode: lr-tb; fill: #000000; fill-opacity: 1; fill-rule: nonzero; stroke: none; stroke-width: 0.264583"
                >
                  {{ experiencia.empresa }}
                </tspan>
              </text>
              <text
                xml:space="preserve"
                x="103.49005"
                :y="152.94672 + index * 47.5"
                style="font-size: 3.175px; stroke-width: 0.264583"
              >
                <tspan
                  style="font-variant: normal; font-weight: normal; font-size: 4.07194px; font-family: Ruda; writing-mode: lr-tb; fill: #000000; fill-opacity: 1; fill-rule: nonzero; stroke: none; stroke-width: 0.264583"
                  dx="0 -0.0021578516 -0.0022836903 -0.0020255574 -0.0021578516 0 -0.0021578516 -0.0022836903 -0.0021578516"
                >
                  {{ experiencia.anoInicio }}
                  {{
                    experiencia.anoFim
                    ? `- ${experiencia.anoFim}`
                    : ""
                  }}
                </tspan>
              </text>
              <text
                xml:space="preserve"
                x="103.49005"
                y="159.40234"
                style="font-size: 3.175px; stroke-width: 0.264583"
              >
                <tspan
                  style="font-variant: normal; font-weight: 300; font-size: 4.42383px; font-family: Nunito-Light; writing-mode: lr-tb; fill: #000000; fill-opacity: 1; fill-rule: nonzero; stroke: none; stroke-width: 0.264583"
                  x="103.49005"
                  :y="159.40234 + index * 47.5"
                >
                  {{ experiencia.posicao }}
                </tspan>
              </text>
            </g>
            <text
              xml:space="preserve"
              x="103.49005"
              :y="167.70168 + index * 47.5"
              style="font-size: 4.09046px; stroke-width: 0.264583"
            >
              <tspan
                v-for="(linhaInfo, indexLinha) in experiencia.info"
                :key="indexLinha"
                style="font-style: normal; font-variant: normal; font-weight: 300; font-stretch: normal; font-size: 4.09046px; line-height: 1.35; font-family: Nunito-Light; -inkscape-font-specification: 'Nunito-Light Light'; writing-mode: lr-tb; fill: #000000; fill-opacity: 1; fill-rule: nonzero; stroke: none; stroke-width: 0.264583"
                x="103.49005"
                :y="(167.70168 + index * 47.5) + indexLinha * 5"
              >
                {{ linhaInfo }}
              </tspan>
            </text>
          </g>
        </g>
        <g>
          <g>
            <text
              xml:space="preserve"
              x="27.901714"
              y="200.11478"
              style="font-size: 3.175px; stroke-width: 0.264583"
            >
              <tspan
                style="font-variant: normal; font-weight: 900; font-size: 4.23333px; font-family: Ruda-Black; writing-mode: lr-tb; fill: #000000; fill-opacity: 1; fill-rule: nonzero; stroke: none; stroke-width: 0.264583"
                x="27.901714"
                y="200.11478"
              >
                HABILIDADES
              </tspan>
            </text>
            <text
              v-for="(habilidade, index) in dados.habilidades"
              :key="index"
              xml:space="preserve"
              x="28.081341"
              :y="211.82178 + index * 7"
              style="font-size: 3.175px; stroke-width: 0.264583"
            >
              <tspan
                style="font-variant: normal; font-weight: 300; font-size: 4.09046px; font-family: Nunito-Light; writing-mode: lr-tb; fill: #000000; fill-opacity: 1; fill-rule: nonzero; stroke: none; stroke-width: 0.264583"
                dx="0 0 -0.0015392664"
              >
                {{ habilidade }}
              </tspan>
            </text>
          </g>
        </g>
        <g>
          <g>
            <text
              xml:space="preserve"
              x="28.081341"
              y="254.74304"
              style="font-size: 3.175px; stroke-width: 0.264583"
            >
              <tspan
                style="font-variant: normal; font-weight: 900; font-size: 4.23333px; font-family: Ruda-Black; writing-mode: lr-tb; fill: #000000; fill-opacity: 1; fill-rule: nonzero; stroke: none; stroke-width: 0.264583"
                x="28.081341"
                y="254.74304"
              >
                IDIOMAS
              </tspan>
            </text>
            <text
              v-for="(idioma, index) in dados.idiomas"
              :key="index"
              xml:space="preserve"
              x="28.081341"
              :y="267.31854 + index * 7"
              style="font-size: 3.175px; stroke-width: 0.264583"
            >
              <tspan
                style="font-variant: normal; font-weight: 300; font-size: 4.09046px; font-family: Nunito-Light; writing-mode: lr-tb; fill: #000000; fill-opacity: 1; fill-rule: nonzero; stroke: none; stroke-width: 0.264583"
              >
                {{ idioma.lingua }}, {{ idioma.nivel }}
              </tspan>
            </text>
            <!-- <text
              xml:space="preserve"
              x="28.081341"
              y="274.46228"
              style="font-size: 3.175px; stroke-width: 0.264583"
            >
              <tspan
                style="font-variant: normal; font-weight: 300; font-size: 4.09046px; font-family: Nunito-Light; writing-mode: lr-tb; fill: #000000; fill-opacity: 1; fill-rule: nonzero; stroke: none; stroke-width: 0.264583"
                dx="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -0.0015392664"
              >
                Espanhol, Intermediário
              </tspan>
            </text> -->
          </g>
        </g>
      </g>
    </g>
  </svg>
</template>

<script setup lang="ts">
import { Curriculum } from "@/utils/types/curriculum.types";

defineProps<{
  dados: Curriculum;
}>();
</script>
