console.log("zalupa");


class onclick_adm
{

	constructor()
	{
		this.elements_with_onclick = document.querySelectorAll('[onclick]');
		this.elements_with_onclick.forEach((elem)=>{
			
			let data_obj = {
				
				'onclick_value': elem.getAttribute('onclick')
			}
			this.elem_s_onclick_values.push(data_obj);
		})
		
	}
	
	remove_onclicks(){
		this.elements_with_onclick.forEach((elem)=>{
			 
			elem.removeAttribute('onclick');
			
		})
		
		
	}
	
	put_onclick_attributes_back (){
		let values_index = 0;
		this.elements_with_onclick.forEach((elem)=>{
			elem.setAttribute('onclick', this.elem_s_onclick_values[values_index].onclick_value);
			values_index ++;
		})
		
	}
	elements_with_onclick = []; 
	elem_s_onclick_values = [];
	
}

class link_adm 
{
	
	constructor()
	{
		this.all_links = document.querySelectorAll('*');
	
	}


	prevent_default_links_behavior ()
	{
		this.all_links.forEach((elem)=>{
			
			elem.addEventListener('mousedown', this.callback);
			elem.addEventListener('click', this.callback);
			elem.addEventListener('mouseup', this.callback);

			
		})
			
	}
	
	remove_prevent_defaults()
	{
		this.all_links.forEach((elem)=>{
			elem.removeEventListener('mousedown', this.callback);
			elem.removeEventListener('click', this.callback);
			elem.removeEventListener('mouseup', this.callback);

		})
	}
	
	callback = (e)=>{
			e.preventDefault();
		};
	
		
	all_links = [];

	
}

class mouseup
{
	constructor()
	{
		this.elems = document.querySelectorAll('*');
	}

	callback(e)
	{
		e.preventDefault();
	}

	put_prevents()
	{
		this.elems.forEach((e)=>{
			e.addEventListener('mouseup', this.callback);
		})
	}
	remove_prevents()
	{
		this.elems.forEach((e)=>{
			e.removeEventListener('mouseup', this.callback);
		})
	}
}

let elements 		= [];
let removal_mode 	= false;
let onclick_admin 	= new onclick_adm();
let link_admin		= new link_adm();
let mystyle 		= document.createElement('style');
mystyle.innerText	= ' *,html :hover { cursor: crosshair !important; } ';
let start_location	= window.location.href;
let mouseup_admin	= new mouseup();


// REMOVAL SWITCH
document.addEventListener('keydown',(e)=>{ 
	
	
	if (e.code == "Backquote")
	{
	
		if (removal_mode === true)
		{
			removal_mode = false;	
			mystyle.remove();
			onclick_admin.put_onclick_attributes_back();
			link_admin.remove_prevent_defaults();
			mouseup_admin.remove_prevents();

			
		}
		else
		{
			removal_mode = true;
			onclick_admin.remove_onclicks();
			document.head.appendChild(mystyle);
			link_admin.prevent_default_links_behavior();
			mouseup_admin.put_prevents();

		}
		
	}
})

// REMOVING ELEMENTS
document.addEventListener('mousedown',(e)=>{ 
	if (removal_mode)
	{
		if(e.target.nodeName === 'HTML' ||  e.target.nodeName === 'BODY') return;
		
		e.preventDefault();	
		
		elements.push(
			{
				'elem': e.target,
				'prev_display_style': e.target.style.display,
			}
		);
		
		e.target.style.display = 'none';

	}
	
})

{// CTRL + Z
	let ctrl_pressed = false;

	document.addEventListener('keydown',(e)=>{ 
		if (e.code === "ControlLeft")
		{
			ctrl_pressed = true;
		}
		
		else if (e.code === 'KeyZ')
		{
			if (ctrl_pressed)
			{
				if (elements.length > 0)
				{				
					
					let elem_to_restore = elements.pop();
					elem_to_restore.elem.style.display = elem_to_restore.prev_display_style;
					
				}
			}
		}
		
	})

	document.addEventListener('keyup',(e)=>{ 
		if (e.code === "ControlLeft")
		{
			ctrl_pressed = false;
		}

	})
	
}






