use tauri::App;
use tauri::api::path;
use tauri;
#[cfg(mobile)]
mod mobile;
#[cfg(mobile)]
pub use mobile::*;

pub type SetupHook = Box<dyn FnOnce(&mut App) -> Result<(), Box<dyn std::error::Error>> + Send>;

#[derive(Default)]
pub struct AppBuilder {
  setup: Option<SetupHook>,
}


#[tauri::command]
fn my_custom_command() {
	let context = tauri::generate_context!();
	let config = context.config();
  match path::app_cache_dir(config) {
		Some(result) => println!("app_cache_dir {}", result.to_string_lossy()),
		None => println!("cannot find app_cache_dir!")
	}
	match path::app_data_dir(config) {
		Some(result) => println!("app_data_dir {}", result.to_string_lossy()),
		None => println!("cannot find app_data_dir!")
	}
	match path::download_dir() {
		Some(result) => println!("download_dir {}", result.to_string_lossy()),
		None => println!("cannot find download_dir!")
	}
}

impl AppBuilder {
  pub fn new() -> Self {
    Self::default()
  }

  #[must_use]
  pub fn setup<F>(mut self, setup: F) -> Self
  where
    F: FnOnce(&mut App) -> Result<(), Box<dyn std::error::Error>> + Send + 'static,
  {
    self.setup.replace(Box::new(setup));
    self
  }

  pub fn run(self) {
    let setup = self.setup;
    tauri::Builder::default()
      .setup(move |app| {
        if let Some(setup) = setup {
          (setup)(app)?;
        }
        Ok(())
      })
			.invoke_handler(tauri::generate_handler![my_custom_command])
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
  }
}
