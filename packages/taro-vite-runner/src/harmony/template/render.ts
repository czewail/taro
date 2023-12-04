import BaseParser from './base'

export default class RenderParser extends BaseParser {
  constructor (
    protected template: Map<string, string>
  ) {
    super()
  }

  generate () {
    const renderContent = `// @ts-nocheck
import { NodeType, TaroCheckboxGroupElement, TaroElement } from '../runtime'
import TaroIcon from './icon'
import TaroText from './text'
import TaroView from './view'
import TaroLabel from './label'
import TaroInput from './input'
import TaroImage from './image'
import { TaroSwiper, TaroSwiperItem } from './swiper'
import TaroButton from './button'
import TaroSlider from './slider'
import TaroSwitch from './switch'
import TaroTextArea from './textArea'
import TaroRichText from './richText'
import TaroInnerHtml from './innerHtml'
import TaroScrollView from './scrollView'
import { TaroRadio, TaroRadioGroup } from './radio'
import { TaroCheckboxGroup, TaroCheckbox } from './checkbox'
import TaroPicker from './picker'
import TaroVideo from './video'
import TaroForm from './form'
${this.generateRenderImport()}

@Builder
function createNode (node: TaroElement) {
  ${this.generateRenderCondition()}if (node.tagName === 'VIEW') {
    TaroView({ node })
  } else if (node.tagName === 'IMAGE') {
    TaroImage({ node })
  } else if (node.tagName === 'TEXT' || node.nodeType === NodeType.TEXT_NODE) {
    TaroText({ node })
  } else if (node.tagName === 'BUTTON') {
    TaroButton({ node })
  } else if (node.tagName === 'SCROLL-VIEW') {
    TaroScrollView({ node })
  } else if (node.tagName === 'SLIDER') {
    TaroSlider({ node })
  } else if (node.tagName === 'SWITCH') {
    TaroSwitch({ node })
  } else if (node.tagName === 'INPUT') {
    TaroInput({ node: node as TaroInputElement })
  } else if (node.tagName === 'SWIPER') {
    TaroSwiper({ node })
  } else if (node.tagName === 'SWIPER-ITEM') {
    TaroSwiperItem({ node })
  } else if (node.tagName === 'INNER-HTML') {
    TaroInnerHtml({ node })
  } else if (node.tagName === 'RICH-TEXT') {
    TaroRichText({ node })
  } else if (node.tagName === 'ICON') {
    TaroIcon({ node })
  } else if (node.tagName === 'TEXTAREA') {
    TaroTextArea({ node })
  } else if (node.tagName === 'CHECKBOX-GROUP') {
    TaroCheckboxGroup({ node: node as TaroCheckboxGroupElement })
  } else if (node.tagName === 'CHECKBOX') {
    TaroCheckbox({ node })
  } else if (node.tagName === 'RADIO-GROUP') {
    TaroRadioGroup({ node: node as TaroRadioGroupElement })
  } else if (node.tagName === 'RADIO') {
    TaroRadio({ node })
  } else if (node.tagName === 'LABEL') {
    TaroLabel({ node })
  } else if (node.tagName === 'PICKER') {
    TaroPicker({ node })
  } else if (node.tagName === 'FORM') {
    TaroForm({ node })
  } else if (node.tagName === 'VIDEO') {
    TaroVideo({ node })
  }
}

export { createNode }
`

    return renderContent
  }

  generateRenderImport () {
    let result = ''

    this.template.forEach((_, key) => {
      result = `${result}import ${key} from './static/${key}'\n`
    })

    return result
  }

  generateRenderCondition () {
    let result = ''
    
    this.template.forEach((_, key) => {
      const keyData = key.split('_')
      const name = keyData[keyData.length - 1]
      result = `${result}if (node._attrs?.compileMode === '${name}') {
    ${key}({ node })
  } else `
    })

    return result
  }
}
