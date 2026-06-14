import sys
import pygame

def ship(screen):
    tuxiang = screen
    #加载图像
    image = pygame.image.load('你的图像目录')
    #获取外接矩形
    rect = image.get_rect()
    screen_rect = screen.get_rect()
    #放置在底部中央
    rect.centerx = screen_rect.centerx
    rect.bottom = screen_rect.bottom
    movjien = Fales
    #指定位置绘制
    screen.blit(image,rect)

def xiangying(ship):
    #响应按键
    for anjian in pygame.event.get():
        if anjian.type == pygame.QUIT:
            sys.exit()
        elif anjian.type == pygame.KEYDOWN:
            ship.rect.centerx +=1

def xiangying_donzuo():
    if 
        
            

def run_game():
    pygame.init()
    pinmu = pygame.display.set_mode((1200，800))
    beijin = (230，230,230,)
    pygame.display.set_caption("飞船大战外星人")
    
    #主循环
    while True:
        #监听鼠标
        xiangying(ship)
        #重绘屏幕
        screen.fill(beijin)

        #让最近的绘制可见
        pygame.display.flip()

run_game()
