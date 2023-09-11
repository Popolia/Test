extends PopupMenu

func _on_HouseIcon_pressed():
	print("Clic sur l'icône de la maison")
	$HouseMenu.show()
	$OtherMenu.hide()
