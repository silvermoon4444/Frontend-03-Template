import { Component, createElement } from './framework'

class Carousel extends Component {
    constructor() {
        super()
        this.attributes = Object.create(null)
    }
    setAttribute(name, val) {
        this.attributes[name] = val
    }

    mountTo(parent) {
        parent.appendChild(this.render())
    }
    render() {
        this.root = document.createElement('div')
        this.root.classList.add('carousel')

        //! 自动轮播
        // let currentIndex = 0
        // setInterval(() => {
        //     let children = this.root.children
        //     let nextIndex = (currentIndex + 1) % children.length

        //     let current = children[currentIndex]
        //     let next = children[nextIndex]

        //     next.style.transition = 'none'
        //     next.style.transform = `translateX(${100 - nextIndex * 100}%)`

        //     setTimeout(() => {
        //         next.style.transition = ''
        //         current.style.transform = `translateX(${-100 - currentIndex * 100}%)`
        //         next.style.transform = `translateX(${-nextIndex * 100}%)`

        //         currentIndex = nextIndex
        //     }, 16);
        // }, 3000)
        let position = 0
        this.root.addEventListener('mousedown', (e) => {
            let startPosX = e.clientX
            let move = (e) => {
                let disPosX = e.clientX - startPosX

                let current = position - ((disPosX - disPosX % 500) / 500)//? 取整 翻到第几个图片  对比 position - Math.round(disPosX / 500)后优化

                for (const offset of [-1, 0, 1]) {
                    let pos = current + offset
                    pos = (pos + this.root.children.length) % this.root.children.length //! 得出三个图片的索引

                    this.root.children[pos].style.transition = 'none'
                    this.root.children[pos].style.transform = `translateX(${-pos * 500 + offset * 500 + disPosX % 500}px)`
                }

            }
            let up = (e) => {
                let disPosX = e.clientX - startPosX
                position = position - Math.round(disPosX / 500)

                for (const offset of [0, -Math.sign(Math.round(disPosX / 500) - disPosX + 250 * Math.sign(disPosX))]) {   //?????
                    let pos = position + offset
                    pos = (pos + this.root.children.length) % this.root.children.length //! 得出三个图片的索引

                    this.root.children[pos].style.transition = ''
                    this.root.children[pos].style.transform = `translateX(${-pos * 500 + offset * 500}px)`
                }
                document.removeEventListener('mousemove', move)
                document.removeEventListener('mouseup', up)
            }
            document.addEventListener('mouseup', up)
            document.addEventListener('mousemove', move)
        })
        for (const src of this.attributes.src) {
            const ele = document.createElement('div')
            ele.style.backgroundImage = `url('${src}')`
            this.root.appendChild(ele)
        }
        return this.root
    }
}

const cats = [
    'https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg',
    'https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg',
    'https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg',
    'https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg',
]

let car = <Carousel src={cats}></Carousel>

car.mountTo(document.getElementById('app'))