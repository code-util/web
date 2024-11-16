const MIN_ZOOM = 2
const MAX_ZOOM = 6
const PAN_SPEED = 0.6
const ZOOM_SPEED = 0.05
const ZOOM_INCREMENT = .5

class ZoomPanElement {
    constructor(mapElement, mapContainerElement, zoomInBtn, zoomOutBtn, locateBtn) {
        this.mapContainerElement = mapContainerElement
        this.mapElement = mapElement
        this.zoomInBtn = zoomInBtn
        this.zoomOutBtn = zoomOutBtn
        this.locateBtn = locateBtn

        this.scale = 3; // Initial scale
        this.translateX = 0 // Initial translation
        this.translateY = 0
        this.startX = 0 // Drag start positions
        this.startY = 0
        this.isPanning = false // Track panning state

        this.zoomIn.bind(this)
        this.zoomOut.bind(this)
        this.locate.bind(this)

        this.zoomInBtn.onclick = () => this.zoomIn()
        this.zoomOutBtn.onclick = () => this.zoomOut()
        this.locateBtn.onclick = () => this.locate()

        this.mapElement.addEventListener('wheel', (event) => {
            event.preventDefault();
            const rect = this.mapElement.getBoundingClientRect();

            // Calculate mouse position relative to the div
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            // Calculate scale increment
            const delta = event.deltaY < 0 ? ZOOM_SPEED : -ZOOM_SPEED;
            const newScale = this.clamp(this.scale + delta, MIN_ZOOM, MAX_ZOOM) // Clamp scale

            // Adjust translation to keep zoom centered around the mouse
            this.translateX -= (mouseX / this.scale - mouseX / newScale);
            this.translateY -= (mouseY / this.scale - mouseY / newScale);

            this.scale = newScale;
            this.updateTransform();
        });

        // Mouse panning
        this.mapElement.addEventListener('pointerdown', (event) => {
            this.isPanning = true;
            this.startX = event.clientX - this.translateX / PAN_SPEED;
            this.startY = event.clientY - this.translateY / PAN_SPEED;

            const onPointerMove = (moveEvent) => {
                this.translateX = (moveEvent.clientX - this.startX) * PAN_SPEED;
                this.translateY = (moveEvent.clientY - this.startY) * PAN_SPEED;
                this.updateTransform();
            };

            const onPointerUp = () => {
                this.isPanning = false;
                window.removeEventListener('pointermove', onPointerMove);
                window.removeEventListener('pointerup', onPointerUp);
            };

            window.addEventListener('pointermove', onPointerMove);
            window.addEventListener('pointerup', onPointerUp);
        });

        // Touch panning
        this.mapElement.addEventListener('touchstart', (event) => {
            if (event.touches.length === 1) {
                // this.isPanning = true;
                this.startX = event.touches[0].clientX - this.translateX / PAN_SPEED;
                this.startY = event.touches[0].clientY - this.translateY / PAN_SPEED;
            } else if (event.touches.length === 2) {
                this.touchStartDist = this.getDistanceBetweenTouches(event);
                this.touchStartScale = this.scale;
            }
            // event.preventDefault(); // Prevent scrolling
        });

        this.mapElement.addEventListener('touchmove', (event) => {
            if (this.isPanning && event.touches.length === 1) {
                this.translateX = (event.touches[0].clientX - this.startX) * PAN_SPEED;
                this.translateY = (event.touches[0].clientY - this.startY) * PAN_SPEED;
                this.updateTransform();
            } else if (event.touches.length === 2) {
                const dist = this.getDistanceBetweenTouches(event);
                const scaleChange = (dist - this.touchStartDist) * ZOOM_SPEED;
                const newScale = this.clamp(this.touchStartScale + scaleChange, MIN_ZOOM, MAX_ZOOM);
                if (newScale !== this.scale) {
                    this.scale = newScale;
                    this.updateTransform();
                }
            }
            event.preventDefault(); // Prevent scrolling
        });

        this.mapElement.addEventListener('touchend', (event) => {
            if (event.touches.length === 0) {
                this.isPanning = false;
            }
        });

        // Prevent clicks on child elements while panning
        this.mapElement.addEventListener('pointerdown', (event) => {
            // Block click events if panning
            if (this.isPanning) {
                event.stopPropagation();
            }
        });

        this.updateTransform()
    }

    locate() {
        this.scale = 3; // Initial scale
        this.translateX = 0 // Initial translation
        this.translateY = 0
        this.updateTransform()
    }

    zoomIn() {
        const newScale = Math.min(this.scale + ZOOM_INCREMENT, MAX_ZOOM)
        this.scale = newScale;
        this.updateTransform();
    }

    zoomOut() {
        const newScale = Math.max(this.scale - ZOOM_INCREMENT, MIN_ZOOM)
        this.scale = newScale;
        this.updateTransform();
    }

    clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    getDistanceBetweenTouches(event) {
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];
        const dx = touch2.clientX - touch1.clientX;
        const dy = touch2.clientY - touch1.clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }

    updateTransform() {
        const maxX = innerWidth / 1.5 * this.scale;
        const maxY = innerHeight / 6 * this.scale;
      
        this.translateX = this.clamp(this.translateX, -maxX, maxX);
        this.translateY = this.clamp(this.translateY, -maxY, maxY);

        this.mapElement.style.transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`;
    }

}