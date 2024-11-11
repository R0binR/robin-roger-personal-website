document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.toggle-button');
    const panel = document.querySelector('.sliding-panel');

    button.addEventListener('click', () => {
        if (panel.style.left === '0px') {
            panel.style.left = '-25%'; // Hide panel
        } else {
            panel.style.left = '0px'; // Show panel
        }
    });

    const satellite1 = document.getElementById('satellite1');
    const satellite2 = document.getElementById('satellite2');
    const contentBox = document.getElementById('contentBox');
    const comebackBtn = document.getElementById('comebackBtn');
    let satellite1Position = 0;
    let satellite1Direction = 1; // 1 pour droite, -1 pour gauche
    let satellite2Position = 0;
    let satellite2VerticalPosition = 100;
    let satellite2Direction = -1; // 1 pour haut/droite, -1 pour bas/gauche
    
    const ANIMATION_SPEED = 0.5;
    let isAnimating = true;
    
    function animateSatellites() {
        if (isAnimating) {
            // Satellite 1 (mouvement horizontal)
            satellite1Position += satellite1Direction * ANIMATION_SPEED;
            if (satellite1Position >= 100) {
                satellite1Direction = -1;
                satellite1.style.zIndex = '1'; // Derrière la planète
                satellite1Position = 100; // Éviter le dépassement
            } else if (satellite1Position <= 0) {
                satellite1Direction = 1;
                satellite1.style.zIndex = '3'; // Devant la planète
                satellite1Position = 0; // Éviter le dépassement
            }
            satellite1.style.left = satellite1Position + '%';
    
            // Satellite 2 (mouvement diagonal)
            satellite2Position += satellite2Direction * ANIMATION_SPEED;
            satellite2VerticalPosition += satellite2Direction * ANIMATION_SPEED;
            if (satellite2Position >= 100 || satellite2VerticalPosition <= 0) {
                satellite2Direction = -1;
                satellite2.style.zIndex = '0'; // Derrière la planète
                satellite2Position = 100; // Éviter le dépassement
                satellite2VerticalPosition = 0; // Éviter le dépassement
            } else if (satellite2Position <= 0 || satellite2VerticalPosition >= 100) {
                satellite2Direction = 1;
                satellite2.style.zIndex = '3'; // Devant la planète
                satellite2Position = 0; // Éviter le dépassement
                satellite2VerticalPosition = 100; // Éviter le dépassement
            }
            satellite2.style.right = satellite2Position + '%';
            satellite2.style.bottom = satellite2VerticalPosition + '%';
        }
    
        requestAnimationFrame(animateSatellites);
    }
    
    // Démarrer l'animation
    animateSatellites();
    
    // Gestion du clic sur les satellites
    satellite1.addEventListener('click', () => {
        isAnimating = false;
        satellite1.style.width = '90%';
        satellite1.style.height = '90%';
        satellite1.style.top = '50%';
        satellite1.style.left = '50%';
        satellite1.style.transform = 'translate(-50%, -50%)';
        satellite1.style.zIndex = '3';
        contentBox.style.display = 'block';
        contentBox.style.transform = 'translate(-50%, -50%) scale(1)';
        comebackBtn.style.display = 'block';
    });
    
    satellite2.addEventListener('click', () => {
        isAnimating = false;
        satellite2.style.width = '90%';
        satellite2.style.height = '90%';
        satellite2.style.top = '50%';
        satellite2.style.right = '50%';
        satellite2.style.transform = 'translate(50%, -50%)';
        satellite2.style.zIndex = '3';
        contentBox.style.display = 'block';
        contentBox.style.transform = 'translate(-50%, -50%) scale(1)';
        comebackBtn.style.display = 'block';
    });
    
    // Gestion du bouton "Come Back"
    comebackBtn.addEventListener('click', () => {
        isAnimating = true;
        contentBox.style.transform = 'translate(-50%, -50%) scale(0)';
        comebackBtn.style.display = 'none';
        setTimeout(() => {
            contentBox.style.display = 'none';
            satellite1.style.width = '8%';
            satellite1.style.height = '8%';
            satellite1.style.top = '50%';
            satellite1.style.left = '0';
            satellite1.style.transform = 'translateY(-50%)';
            satellite1Position = 0;
            satellite1Direction = 1;
            satellite1.style.zIndex = '3';
    
            satellite2.style.width = '8%';
            satellite2.style.height = '8%';
            satellite2.style.top = '100%';
            satellite2.style.right = '0';
            satellite2.style.transform = 'translateY(-50%)';
            satellite2Position = 0;
            satellite2VerticalPosition = 100;
            satellite2Direction = -1;
            satellite2.style.zIndex = '3';
        }, 500);
    });
});
