extends Control

@onready var anim_player = $ "../../../../../../AnimationPlayer"
var isSidebarOpen = false

func _on_gui_input(event):
	if event is InputEventMouseButton:
		if event.get_button_index() == 1 and event.is_pressed():
			# Inversez l'état de la barre latérale (ouverture/fermeture)
			isSidebarOpen = not isSidebarOpen
			
			# Jouez l'animation appropriée en fonction de l'état de la barre latérale
			if isSidebarOpen:
				anim_player.play("sidebar_anime")
			else:
				anim_player.play_backwards("sidebar_anime")
