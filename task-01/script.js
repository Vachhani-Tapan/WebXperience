document.addEventListener('DOMContentLoaded', () => {
    const shards = document.querySelectorAll('.shard');
    const container = document.querySelector('.shard-container');

    // Smooth entrance animation
    shards.forEach((shard, index) => {
        shard.style.opacity = '0';
        shard.style.transform = 'scale(1.1)';

        setTimeout(() => {
            shard.style.transition = 'opacity 1s ease, transform 1s cubic-bezier(0.23, 1, 0.32, 1)';
            shard.style.opacity = '1';
            shard.style.transform = 'scale(1)';
        }, index * 100);
    });

    // Dynamic mouse parallax effect
    container.addEventListener('mousemove', (e) => {
        const { width, height, left, top } = container.getBoundingClientRect();
        const mouseX = (e.clientX - left) / width - 0.5;
        const mouseY = (e.clientY - top) / height - 0.5;

        shards.forEach((shard, index) => {
            const factor = (index + 1) * 10;
            const x = mouseX * factor;
            const y = mouseY * factor;

            if (!shard.matches(':hover')) {
                shard.style.transform = `translate(${x}px, ${y}px)`;
            }
        });
    });

    // Reset on mouse leave
    container.addEventListener('mouseleave', () => {
        shards.forEach(shard => {
            shard.style.transform = 'translate(0, 0)';
        });
    });
});
